package com.ssafy.devfolio.sentence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.service.CommentRoomService;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.pubsub.RedisSenderService;
import com.ssafy.devfolio.sentence.dto.FeelingRequest;
import com.ssafy.devfolio.sentence.dto.FeelingType;
import com.ssafy.devfolio.sentence.dto.SentenceFixRequest;
import com.ssafy.devfolio.utils.property.RedisKeyPrefixProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.devfolio.utils.FunctionExceptionWrapper.wrapper;

@Service
@RequiredArgsConstructor
public class SentenceService {

    private final RedisKeyPrefixProperties keyPrefixProperties;

    private String DOCUMENT_PREFIX;
    private String COMMENT_ROOM_PREFIX;
    private String MEMBER_ROOM_PREFIX;

    private final ValueOperations<String, String> valueOperations;
    private final HashOperations<String, String, String> hashOperations;
    private final ListOperations<String, String> listOperations;

    private final ObjectMapper objectMapper;
    private final CommentRoomService commentRoomService;
    private final RedisSenderService redisSenderService;

    @PostConstruct
    public void init() {
        DOCUMENT_PREFIX = keyPrefixProperties.getDocument();
        COMMENT_ROOM_PREFIX = keyPrefixProperties.getCommentRoom();
        MEMBER_ROOM_PREFIX = keyPrefixProperties.getMemberRoom();
    }

    /**
     *
     * 문서 ID에 해당하는 문장들 생성 기준으로 정렬해 반환
     *
     * @param documentId : 문서ID
     * @return 문서 (Sentence 리스트)
     */
    public List<Sentence> getDocument(String documentId) {
        return hashOperations.values(DOCUMENT_PREFIX + documentId).stream()
                .map(wrapper(s -> objectMapper.readValue(s, Sentence.class)))
                .sorted(Comparator.comparing(Sentence::getCreatedDate))
                .collect(Collectors.toList());
    }

    /**
     * 해당 문장 내용 수정
     * @param documentId
     * @param sentenceId
     * @param modifiedContent
     */
    public Sentence fixSentence(Long memberId, String commentRoomId, String documentId, String sentenceId, String modifiedContent) throws JsonProcessingException {
        CommentRoom commentRoom = commentRoomService.getCommentRoomById(commentRoomId);

        if (!commentRoom.getMemberId().equals(memberId)) {
            throw new BaseException(ErrorCode.SENTENCE_ONLY_FIXED_BY_OWNER_EXCEPTION);
        }

        Sentence sentence = getSentence(documentId, sentenceId);
        sentence.fix(modifiedContent);

        hashOperations.put(DOCUMENT_PREFIX + documentId, sentenceId, objectMapper.writeValueAsString(sentence));

        return sentence;
    }

    public Sentence getSentence(String documentId, String sentenceId) throws JsonProcessingException {
        if (!hashOperations.hasKey(DOCUMENT_PREFIX + documentId, sentenceId)) {
            throw  new BaseException(ErrorCode.SENTENCE_NOT_EXIST);
        }

        return objectMapper.readValue(hashOperations.get(DOCUMENT_PREFIX + documentId, sentenceId), Sentence.class);
    }

    public Sentence pressFeeling(String documentId, String sentenceId, FeelingRequest request) throws JsonProcessingException {
        String nickname = request.getNickname();
        FeelingType feelingType = request.getFeelingType();
        Sentence sentence = getSentence(documentId, sentenceId);

        if (feelingType.equals(FeelingType.POSITIVE)) {
            Feeling positive = sentence.getPositive();
            if (positive.getMembers().contains(nickname)) {
                positive.cancelFeeling(nickname);
            } else {
                positive.pressFeeling(nickname);
            }
        } else if (feelingType.equals(FeelingType.NEGATIVE)) {
            Feeling negative = sentence.getNegative();
            if (negative.getMembers().contains(nickname)) {
                negative.cancelFeeling(nickname);
            } else {
                negative.pressFeeling(nickname);
            }
        }

        hashOperations.put(DOCUMENT_PREFIX + documentId, sentenceId, objectMapper.writeValueAsString(sentence));

        return sentence;
    }

    public void updateNewComment(String commentRoomId, String documentId, String sentenceId) throws JsonProcessingException {
        Sentence sentence = getSentence(documentId, sentenceId);
        sentence.updateNewComment();

        hashOperations.put(DOCUMENT_PREFIX + documentId, sentenceId, objectMapper.writeValueAsString(sentence));

        redisSenderService.sendSentenceUpdateService(commentRoomId, sentence); // 문장 댓글 상태 수정해서 소켓으로 전송
    }
}
