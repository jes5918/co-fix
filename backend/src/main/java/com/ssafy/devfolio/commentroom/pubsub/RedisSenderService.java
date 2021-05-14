package com.ssafy.devfolio.commentroom.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.comment.Comment;
import com.ssafy.devfolio.comment.dto.SentenceSub;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.dto.CommentRoomSub;
import com.ssafy.devfolio.sentence.Sentence;
import com.ssafy.devfolio.utils.property.RedisKeyPrefixProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class RedisSenderService {

    private String COMMENT_ROOM_PREFIX;

    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;

    private final ObjectMapper objectMapper;

    //    private final SimpMessageSendingOperations messageTemplate;
    private final RedisKeyPrefixProperties keyPrefixProperties;

    @PostConstruct
    public void init() {
        COMMENT_ROOM_PREFIX = keyPrefixProperties.getCommentRoom();
    }

    public void sendRoomUpdateService(ChannelTopic channelTopic, CommentRoom room) throws JsonProcessingException {
        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(room.getRoomId())
                .roomTitle(room.getRoomTitle())
                .memberLimit(room.getMemberLimit())
                .status(room.getStatus())
                .members(room.getMembers())
                .lastModifiedDate(room.getLastModifiedDate())
                .build();

        redisTemplate.convertAndSend(channelTopic.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
//        messageTemplate.convertAndSend("/room/" + commentRoomSub.getRoomId(), commentRoomSub);

    }

    public void sendSentenceUpdateService(ChannelTopic channelTopic, String roomId, Sentence sentence) throws JsonProcessingException {
        CommentRoom commentRoom = objectMapper.readValue(valueOperations.get(COMMENT_ROOM_PREFIX + roomId), CommentRoom.class);

        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(roomId)
                .sentence(sentence)
                .lastModifiedDate(commentRoom.getLastModifiedDate())
                .build();

        System.out.println("channelTopic = " + channelTopic);
        System.out.println("channelTopic.getTopic() = " + channelTopic.getTopic());

        redisTemplate.convertAndSend(channelTopic.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
//        messageTemplate.convertAndSend("/room/" + commentRoomSub.getRoomId(), commentRoomSub);
    }

    public void sendCommentUpdateService(ChannelTopic channelTopic, String sentenceId, Comment comment) throws JsonProcessingException {

        SentenceSub sentenceSub = SentenceSub.builder()
                .sentenceId(sentenceId)
                .commentId(comment.getCommentId())
                .nickname(comment.getNickname())
                .content(comment.getContent())
                .agree(comment.getAgree())
                .lastModifiedDate(comment.getLastModifiedDate())
                .build();

        redisTemplate.convertAndSend(channelTopic.getTopic(), objectMapper.writeValueAsString(sentenceSub));
//        messageTemplate.convertAndSend("/sentence/" + sentenceId, sentenceSub);

    }
}
