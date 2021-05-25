package com.ssafy.devfolio.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.comment.Comment;
import com.ssafy.devfolio.comment.dto.SentenceSub;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.dto.CommentRoomSub;
import com.ssafy.devfolio.commentroom.dto.UpdatedType;
import com.ssafy.devfolio.member.dto.JoinMember;
import com.ssafy.devfolio.sentence.Sentence;
import com.ssafy.devfolio.utils.property.RedisKeyPrefixProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RedisSenderService {

    private String COMMENT_ROOM_PREFIX;

    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;

    private final Map<String, ChannelTopic> channels;
    private final ObjectMapper objectMapper;

    private final RedisKeyPrefixProperties keyPrefixProperties;

    @PostConstruct
    public void init() {
        COMMENT_ROOM_PREFIX = keyPrefixProperties.getCommentRoom();
    }

    public void sendRoomUpdateService(CommentRoom room) throws JsonProcessingException {
        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(room.getRoomId())
                .roomTitle(room.getRoomTitle())
                .memberLimit(room.getMemberLimit())
                .status(room.getStatus())
                .members(room.getMembers())
                .updatedType(UpdatedType.ROOM)
                .lastModifiedDate(room.getLastModifiedDate())
                .build();

        ChannelTopic channel = channels.get(room.getRoomId());

        redisTemplate.convertAndSend(channel.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
    }

    // 인원 변동 발생시
    public void sendRoomUpdateService(CommentRoom room, JoinMember updatedMember) throws JsonProcessingException {
        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(room.getRoomId())
                .roomTitle(room.getRoomTitle())
                .memberLimit(room.getMemberLimit())
                .status(room.getStatus())
                .members(room.getMembers())
                .updatedMember(updatedMember)
                .updatedType(UpdatedType.ROOM)
                .lastModifiedDate(room.getLastModifiedDate())
                .build();

        ChannelTopic channel = channels.get(room.getRoomId());

        redisTemplate.convertAndSend(channel.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
    }

    public void sendSentenceUpdateService(String roomId, Sentence sentence) throws JsonProcessingException {
        CommentRoom commentRoom = objectMapper.readValue(valueOperations.get(COMMENT_ROOM_PREFIX + roomId), CommentRoom.class);

        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(roomId)
                .sentence(sentence)
                .updatedType(UpdatedType.SENTENCE)
                .lastModifiedDate(commentRoom.getLastModifiedDate())
                .build();

        ChannelTopic channel = channels.get(roomId);

        redisTemplate.convertAndSend(channel.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
    }

    public void sendCommentUpdateService(String sentenceId, Comment comment) throws JsonProcessingException {

        SentenceSub sentenceSub = SentenceSub.builder()
                .sentenceId(sentenceId)
                .commentId(comment.getCommentId())
                .nickname(comment.getNickname())
                .content(comment.getContent())
                .isAgree("false")
                .agree(comment.getAgree())
                .lastModifiedDate(comment.getLastModifiedDate())
                .build();

        ChannelTopic channel = channels.get(sentenceId);

        redisTemplate.convertAndSend(channel.getTopic(), objectMapper.writeValueAsString(sentenceSub));

    }

    public void sendCommentAgreeUpdateService(String sentenceId, Comment comment) throws JsonProcessingException {

        SentenceSub sentenceSub = SentenceSub.builder()
                .sentenceId(sentenceId)
                .commentId(comment.getCommentId())
                .nickname(comment.getNickname())
                .content(comment.getContent())
                .isAgree("true")
                .agree(comment.getAgree())
                .lastModifiedDate(comment.getLastModifiedDate())
                .build();

        ChannelTopic channel = channels.get(sentenceId);

        redisTemplate.convertAndSend(channel.getTopic(), objectMapper.writeValueAsString(sentenceSub));

    }

}
