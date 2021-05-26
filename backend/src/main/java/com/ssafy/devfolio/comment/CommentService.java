package com.ssafy.devfolio.comment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.comment.dto.CommentRequest;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.sentence.SentenceService;
import com.ssafy.devfolio.utils.property.RedisKeyPrefixProperties;
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
public class CommentService {

    private final RedisKeyPrefixProperties keyPrefixProperties;

    private String SENTENCE_PREFIX;
    private String DOCUMENT_PREFIX;

    private final SentenceService sentenceService;
    private final HashOperations<String, String, String> hashOperations;

    private final ObjectMapper objectMapper;

    @PostConstruct
    public void init() {
        SENTENCE_PREFIX = keyPrefixProperties.getSentence();
        DOCUMENT_PREFIX = keyPrefixProperties.getDocument();
    }

    public Comment writeComment(String commentRoomId, String documentId, String sentenceId, CommentRequest request) throws JsonProcessingException {
        Comment comment = Comment.createComment(request);
        String commentToString = objectMapper.writeValueAsString(comment);

        hashOperations.put(SENTENCE_PREFIX + sentenceId, comment.getCommentId(), commentToString);

        sentenceService.updateNewComment(commentRoomId, documentId, sentenceId);

        return comment;
    }

    public List<Comment> getComments(String documentId, String sentenceId) {
        if (!hashOperations.hasKey(DOCUMENT_PREFIX + documentId, sentenceId)){
            throw new BaseException(ErrorCode.SENTENCE_NOT_EXIST);
        }

        return hashOperations.values(SENTENCE_PREFIX + sentenceId).stream()
                .map(wrapper(commentString -> objectMapper.readValue(commentString, Comment.class)))
                .sorted(Comparator.comparing(Comment::getCreatedDate))
                .collect(Collectors.toList());
    }

    public Comment getComment(String sentenceId, String commentId) throws JsonProcessingException {
        if (!hashOperations.hasKey(SENTENCE_PREFIX + sentenceId, commentId)) {
            throw new BaseException(ErrorCode.COMMENT_NOT_EXIST);
        }

        return objectMapper.readValue(hashOperations.get(SENTENCE_PREFIX + sentenceId, commentId), Comment.class);
    }

    public Comment pressAgree(String sentenceId, String commentId, String nickname) throws JsonProcessingException {
        Comment comment = getComment(sentenceId, commentId);

        comment.pressAgree(nickname);
        String commentToString = objectMapper.writeValueAsString(comment);

        hashOperations.put(SENTENCE_PREFIX + sentenceId, comment.getCommentId(), commentToString);

        return comment;
    }

}
