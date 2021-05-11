package com.ssafy.devfolio.sentence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.sentence.dto.SentenceFixRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
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

    private final String COMMENT_ROOM_PREFIX = "room:";
    private final String DOCUMENT_PREFIX = "document:";
    private final String MEMBER_ROOM_PREFIX = "member-room:";

    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;
    private ValueOperations<String, String> valueOperations;
    private ListOperations<String, String> listOperations;

    private final ObjectMapper objectMapper;

    @PostConstruct
    public void init() {
        hashOperations = redisTemplate.opsForHash();
        valueOperations = redisTemplate.opsForValue();
        listOperations = redisTemplate.opsForList();
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
     * @param request
     */
    public void fixSentence(Long memberId, String documentId, String sentenceId, SentenceFixRequest request) throws JsonProcessingException {
        if (listOperations.indexOf(MEMBER_ROOM_PREFIX + memberId, request.getRoomId()) == null) {
            throw new BaseException(ErrorCode.SENTENCE_ONLY_FIXED_BY_OWNER_EXCEPTION);
        }

        Sentence sentence = getSentence(documentId, sentenceId);
        sentence.fix(request.getModifiedContent());

        hashOperations.put(DOCUMENT_PREFIX + documentId, sentenceId, objectMapper.writeValueAsString(sentence));
    }

    public Sentence getSentence(String documentId, String sentenceId) throws JsonProcessingException {
        if (!hashOperations.hasKey(DOCUMENT_PREFIX + documentId, sentenceId)) {
            throw  new BaseException(ErrorCode.SENTENCE_NOT_EXIST);
        }

        return objectMapper.readValue(hashOperations.get(DOCUMENT_PREFIX + documentId, sentenceId), Sentence.class);
    }
}
