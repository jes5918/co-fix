package com.ssafy.devfolio.sentence;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.utils.FunctionExceptionWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.devfolio.utils.FunctionExceptionWrapper.wrapper;

@Service
@RequiredArgsConstructor
public class SentenceService {

    private final String DOCUMENT_PREFIX = "document:";

    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;

    private final ObjectMapper objectMapper;

    @PostConstruct
    public void init() {
        hashOperations = redisTemplate.opsForHash();
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
}
