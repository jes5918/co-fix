package com.ssafy.devfolio.commentroom;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.dto.CreateCommentRoomRequest;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.member.MemberRepository;
import com.ssafy.devfolio.sentence.Sentence;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentRoomService {

    private final String COMMENT_ROOM_PREFIX = "room:";
    private final String DOCUMENT_PREFIX = "document:";
    private final String PIN_CHECK_PREFIX = "pin-room:";
    private final String MEMBER_ROOM_PREFIX = "member-room:";
    private final String PARTICIPANT_PREFIX = "participant:";
    private final int PIN_NUMBER_DIGITS = 8;

    private final RedisTemplate<String, String> redisTemplate;
    private ValueOperations<String, String> valueOperations;
    private HashOperations<String, String, String> hashOperations;
    private ListOperations<String, String> listOperations;

    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @PostConstruct
    public void init() {
        valueOperations = redisTemplate.opsForValue();
        hashOperations = redisTemplate.opsForHash();
        listOperations = redisTemplate.opsForList();
    }

    public CommentRoom createCommentRoom(CreateCommentRoomRequest request, Long memberId) throws JsonProcessingException {
        CommentRoom commentRoom = CommentRoom.createCommentRoom(request, memberId);

        // 주어진 문서 문장으로 쪼개서 저장
        commentRoom.setDocument(createDocument(request.getContents()));

        // 핀번호 생성
        commentRoom.setPinNumber(createPinNumber(PIN_NUMBER_DIGITS));

        // redis에 첨삭방 저장
        String commentRoomToString = objectMapper.writeValueAsString(commentRoom);
        valueOperations.set(COMMENT_ROOM_PREFIX + commentRoom.getRoomId(), commentRoomToString);

        // 멤버 - 방 저장 (특정 유저가 만든 방 목록 확인 위함)
        listOperations.leftPush(MEMBER_ROOM_PREFIX + memberId, commentRoom.getRoomId());

        // 핀번호 - 방 저장 (핀번호로 방 찾기 위함)
        valueOperations.set(PIN_CHECK_PREFIX + commentRoom.getPinNumber(), commentRoom.getRoomId());

        // 참가자 정보 저장
        memberRepository.findById(memberId)
                .map(m -> listOperations.rightPush(PARTICIPANT_PREFIX + commentRoom.getRoomId(), m.getName()))
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_EXIST));

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
    }

    public CommentRoom getCommentRoom(String pinNumber) throws JsonProcessingException {
        if (!redisTemplate.hasKey(PIN_CHECK_PREFIX + pinNumber)) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_NOT_EXIST);
        }

        String commentRoomId = valueOperations.get(PIN_CHECK_PREFIX + pinNumber);

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

        Collections.addAll(sentences, content.split("[.!?]+"));

        return sentences;
    }
}
