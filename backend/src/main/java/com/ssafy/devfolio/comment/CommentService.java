package com.ssafy.devfolio.comment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.comment.dto.CommentRequest;
import com.ssafy.devfolio.sentence.Sentence;
import com.ssafy.devfolio.sentence.SentenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final String DOCUMENT_PREFIX = "document:";
    private final String SENTENCE_PREFIX = "sentence:";

    private final SentenceService sentenceService;
    private final RedisTemplate<String, String> redisTemplate;
    private HashOperations<String, String, String> hashOperations;

    private final ObjectMapper objectMapper;

    @PostConstruct
    public void init() {
        hashOperations = redisTemplate.opsForHash();
    }

    public Comment writeComment(String documentId, String sentenceId, CommentRequest request) throws JsonProcessingException {
        Comment comment = Comment.createComment(request);
        String commentToString = objectMapper.writeValueAsString(comment);

        hashOperations.put(SENTENCE_PREFIX + sentenceId, comment.getCommentId(), commentToString);

        sentenceService.updateNewComment(documentId, sentenceId);

        return comment;
    }
}
