package com.ssafy.devfolio.comment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.comment.dto.CommentRequest;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.sentence.Sentence;
import com.ssafy.devfolio.sentence.SentenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.devfolio.utils.FunctionExceptionWrapper.wrapper;

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

    public List<Comment> getComments(String sentenceId) {
        return hashOperations.values(SENTENCE_PREFIX + sentenceId).stream()
                .map(wrapper(commentString -> objectMapper.readValue(commentString, Comment.class)))
                .collect(Collectors.toList());
    }

    public Comment getComment(String sentenceId, String commentId) throws JsonProcessingException {
        if (!hashOperations.hasKey(SENTENCE_PREFIX + sentenceId, commentId)) {
            throw new BaseException(ErrorCode.COMMENT_NOT_EXIST);
        }

        return objectMapper.readValue(hashOperations.get(SENTENCE_PREFIX + sentenceId, commentId), Comment.class);
    }

    public void pressAgree(String sentenceId, String commentId, String nickname) throws JsonProcessingException {
        Comment comment = getComment(sentenceId, commentId);

        comment.pressAgree(nickname);
        String commentToString = objectMapper.writeValueAsString(comment);

        hashOperations.put(SENTENCE_PREFIX + sentenceId, comment.getCommentId(), commentToString);
    }
}
