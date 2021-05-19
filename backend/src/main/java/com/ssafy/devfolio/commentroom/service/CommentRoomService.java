package com.ssafy.devfolio.commentroom.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.RoomStatus;
import com.ssafy.devfolio.commentroom.dto.CreateCommentRoomRequest;
import com.ssafy.devfolio.commentroom.pubsub.RedisSenderService;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.member.MemberRepository;
import com.ssafy.devfolio.member.domain.Member;
import com.ssafy.devfolio.member.dto.SocketMemberInfo;
import com.ssafy.devfolio.sentence.Sentence;
import com.ssafy.devfolio.utils.property.RedisKeyPrefixProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.devfolio.utils.FunctionExceptionWrapper.wrapper;

@Service
@RequiredArgsConstructor
public class CommentRoomService {

    private final RedisKeyPrefixProperties keyPrefixProperties;

    private String COMMENT_ROOM_PREFIX;
    private String DOCUMENT_PREFIX;
    private String PIN_CHECK_PREFIX;
    private String MEMBER_ROOM_PREFIX;
    private String PARTICIPANT_PREFIX;
    private final int PIN_NUMBER_DIGITS = 8;

    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;
    private final HashOperations<String, String, String> hashOperations;
    private final ListOperations<String, String> listOperations;

    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    private final RedisSenderService redisSenderService;
    private final Map<String, ChannelTopic> channels;

    @PostConstruct
    public void init() {
        COMMENT_ROOM_PREFIX = keyPrefixProperties.getCommentRoom();
        DOCUMENT_PREFIX = keyPrefixProperties.getDocument();
        PIN_CHECK_PREFIX = keyPrefixProperties.getPinCheck();
        MEMBER_ROOM_PREFIX = keyPrefixProperties.getMemberRoom();
        PARTICIPANT_PREFIX = keyPrefixProperties.getParticipant();
    }

    public CommentRoom createCommentRoom(CreateCommentRoomRequest request, Long memberId) throws JsonProcessingException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_EXIST));
        CommentRoom commentRoom = CommentRoom.createCommentRoom(request, memberId);

        // 주어진 문서 문장으로 쪼개서 저장
        commentRoom.setDocument(createDocument(request.getContents()));

        // 핀번호 생성
        commentRoom.setPinNumber(createPinNumber(PIN_NUMBER_DIGITS));

        //참가자 정보 저장
        commentRoom.enterCommentRoom(member.getName());

        // redis에 첨삭방 저장
        String commentRoomToString = objectMapper.writeValueAsString(commentRoom);
        valueOperations.set(COMMENT_ROOM_PREFIX + commentRoom.getRoomId(), commentRoomToString);

        // 멤버 - 방 저장 (특정 유저가 만든 방 목록 확인 위함)
        listOperations.leftPush(MEMBER_ROOM_PREFIX + memberId, commentRoom.getRoomId());

        // 핀번호 - 방 저장 (핀번호로 방 찾기 위함)
        valueOperations.set(PIN_CHECK_PREFIX + commentRoom.getPinNumber(), commentRoom.getRoomId());

        // 참가자 정보 저장
        listOperations.rightPush(PARTICIPANT_PREFIX + commentRoom.getRoomId(), member.getName());

        return commentRoom;
    }

    public void closeCommentRoom(String commentRoomId, Long memberId) throws JsonProcessingException {
        if (!redisTemplate.hasKey(COMMENT_ROOM_PREFIX + commentRoomId)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_NOT_EXIST);
        }

        CommentRoom commentRoom = objectMapper.readValue(
                valueOperations.get(COMMENT_ROOM_PREFIX + commentRoomId), CommentRoom.class);

        if (!memberId.equals(commentRoom.getMemberId())) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_ONLY_CLOSED_BY_OWNER_EXCEPTION);
        }
        commentRoom.closeCommentRoom();
        valueOperations.setIfPresent(COMMENT_ROOM_PREFIX + commentRoomId, objectMapper.writeValueAsString(commentRoom));

        // subscriber 에게 방 닫힘 전달
        redisSenderService.sendRoomUpdateService(commentRoom);
    }

    public CommentRoom getCommentRoom(String pinNumber) throws JsonProcessingException {
        if (!redisTemplate.hasKey(PIN_CHECK_PREFIX + pinNumber)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_NOT_EXIST);
        }

        String commentRoomId = valueOperations.get(PIN_CHECK_PREFIX + pinNumber);

        return objectMapper.readValue(valueOperations.get(COMMENT_ROOM_PREFIX + commentRoomId), CommentRoom.class);
    }

    public CommentRoom getCommentRoomById(String commentRoomId) throws JsonProcessingException {
        if (!redisTemplate.hasKey(COMMENT_ROOM_PREFIX + commentRoomId)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_NOT_EXIST);
        }

        return objectMapper.readValue(valueOperations.get(COMMENT_ROOM_PREFIX + commentRoomId), CommentRoom.class);
    }

    private String createPinNumber(int digits) {
        Random random = new Random();
        StringBuilder pinNumber;
        do {
            pinNumber = new StringBuilder();
            for (int i = 0; i < digits; ++i) {
                pinNumber.append(random.nextInt(10));
            }
        } while (redisTemplate.hasKey(PIN_CHECK_PREFIX + pinNumber.toString()));

        return pinNumber.toString();
    }

    private String createDocument(String content) throws JsonProcessingException {
        String documentId = UUID.randomUUID().toString();

        List<String> sentences = splitDocument(content);

        for (String data : sentences) {
            Sentence sentence = Sentence.createSentence(data);
            String sentenceToString = objectMapper.writeValueAsString(sentence);
            hashOperations.put(DOCUMENT_PREFIX + documentId, sentence.getSentenceId(), sentenceToString);
        }

        return documentId;
    }

    private List<String> splitDocument(String content) {
        List<String> sentences = new ArrayList<>();

        StringBuilder sentence = new StringBuilder();
        boolean punctuation = false; // 현재 구두점(.)찍힌 상태인지 아닌지 (....같은 부분 체크 위함)

        for (int i = 0; i < content.length(); i++) {
            char current = content.charAt(i);

            if (current == '?' || current == '!') {
                sentence.append(current);
                sentences.add(sentence.toString().trim());
                sentence = new StringBuilder();
            } else if (current == '.') {
                // .인 경우 ...을 체크하기 위해 더 탐색
                sentence.append(current);
                punctuation = true;
            } else if (punctuation) {
                // . ? ! 이 아닌 경우 구두점이 찍혀있던 상태인 경우 (., ... 등) 문장 추가
                sentences.add(sentence.toString().trim());
                sentence = new StringBuilder();
                sentence.append(current);
                punctuation = false;
            } else {
                sentence.append(current);
            }
        }
        String lastSentence = sentence.toString().trim();
        if (lastSentence.length() > 0) {
            sentences.add(lastSentence);
        }

        return sentences;
    }

    public CommentRoom fixRoomTitle(String commentRoomId, String roomTitle, Long memberId) throws JsonProcessingException {
        CommentRoom commentRoom = getCommentRoomById(commentRoomId);

        if (!commentRoom.getMemberId().equals(memberId)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_ONLY_FIXED_BY_OWNER_EXCEPTION);
        }

        commentRoom.fixRoomTitle(roomTitle);

        valueOperations.setIfPresent(COMMENT_ROOM_PREFIX + commentRoomId, objectMapper.writeValueAsString(commentRoom));

        return commentRoom;
    }

    public CommentRoom fixMemberLimit(String commentRoomId, int memberLimit, Long memberId) throws JsonProcessingException {
        if (memberLimit <= 0) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_INVALID_MEMBER_LIMIT);
        }

        CommentRoom commentRoom = getCommentRoomById(commentRoomId);

        if (!commentRoom.getMemberId().equals(memberId)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_ONLY_FIXED_BY_OWNER_EXCEPTION);
        }

        commentRoom.fixMemberLimit(memberLimit);

        valueOperations.setIfPresent(COMMENT_ROOM_PREFIX + commentRoomId, objectMapper.writeValueAsString(commentRoom));

        return commentRoom;
    }

    public boolean isClosedRoom(String commentRoomId) throws JsonProcessingException {
        CommentRoom commentRoom = getCommentRoomById(commentRoomId);

        return commentRoom.getStatus().equals(RoomStatus.CLOSED);
    }

    public CommentRoom enterCommentRoom(String pinNumber, String nickname) throws JsonProcessingException {
        CommentRoom commentRoom = getCommentRoom(pinNumber);

        if (commentRoom.getStatus().equals(RoomStatus.CLOSED)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_CLOSED_EXCEPTION);
        }

        int enterResult = commentRoom.enterCommentRoom(nickname);

        // 첨삭방 정보 저장
        valueOperations.setIfPresent(COMMENT_ROOM_PREFIX + commentRoom.getRoomId(), objectMapper.writeValueAsString(commentRoom));

        // 신규 유저인 경우 참가자 정보 저장
        if (enterResult == 1) {
            listOperations.rightPush(PARTICIPANT_PREFIX + commentRoom.getRoomId(), nickname);
        }

        return commentRoom;
    }

    public List<CommentRoom> getMemberRooms(Long memberId) {
        Long size = listOperations.size(MEMBER_ROOM_PREFIX + memberId);

        List<String> commentRoomIds = listOperations.range(MEMBER_ROOM_PREFIX + memberId, 0, size - 1);

        return commentRoomIds.stream()
                .map(wrapper(this::getCommentRoomById))
                .collect(Collectors.toList());
    }

    public void exitCommentRoom(SocketMemberInfo currentSession) throws JsonProcessingException {
        CommentRoom commentRoom = getCommentRoomById(currentSession.getCommentRoomId());

        commentRoom.exitCommentRoom(currentSession.getNickname());

        // 수정된 첨삭방 정보 저장
        valueOperations.setIfPresent(COMMENT_ROOM_PREFIX + commentRoom.getRoomId(), objectMapper.writeValueAsString(commentRoom));

        // 변경 내용 publish
        redisSenderService.sendRoomUpdateService(commentRoom);
    }

    public void reenterCommentRoom(SocketMemberInfo currentSession) throws JsonProcessingException {
        CommentRoom commentRoom = getCommentRoomById(currentSession.getCommentRoomId());

        // 첨삭방 새로 생성된 경우 처리 안함
        if (commentRoom == null) {
            return;
        }

        if (commentRoom.getStatus().equals(RoomStatus.CLOSED)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_CLOSED_EXCEPTION);
        }

        commentRoom.enterCommentRoom(currentSession.getNickname());

        // 첨삭방 정보 저장
        valueOperations.setIfPresent(COMMENT_ROOM_PREFIX + commentRoom.getRoomId(), objectMapper.writeValueAsString(commentRoom));

        // 변경 내용 publish
        redisSenderService.sendRoomUpdateService(commentRoom);
    }
}
