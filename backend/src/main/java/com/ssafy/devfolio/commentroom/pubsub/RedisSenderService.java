package com.ssafy.devfolio.commentroom.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.dto.CommentRoomSub;
import com.ssafy.devfolio.sentence.Sentence;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisSenderService {

    private final String COMMENT_ROOM_PREFIX = "room:";

    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;

    private final ChannelTopic channelTopic;
    private final ObjectMapper objectMapper;

    private final SimpMessageSendingOperations messageTemplate;

    public void sendRoomUpdateService(CommentRoom room) throws JsonProcessingException {
        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(room.getRoomId())
                .roomTitle(room.getRoomTitle())
                .memberLimit(room.getMemberLimit())
                .status(room.getStatus())
                .members(room.getMembers())
                .lastModifiedDate(room.getLastModifiedDate())
                .build();

        redisTemplate.convertAndSend(channelTopic.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
        messageTemplate.convertAndSend("/room/" + commentRoomSub.getRoomId(), commentRoomSub);

    }

    public void sendSentenceUpdateService(String roomId, Sentence sentence) throws JsonProcessingException {
        CommentRoom commentRoom = objectMapper.readValue(valueOperations.get(COMMENT_ROOM_PREFIX + roomId), CommentRoom.class);

        CommentRoomSub commentRoomSub = CommentRoomSub.builder()
                .roomId(roomId)
                .sentence(sentence)
                .lastModifiedDate(commentRoom.getLastModifiedDate())
                .build();

        redisTemplate.convertAndSend(channelTopic.getTopic(), objectMapper.writeValueAsString(commentRoomSub));
        messageTemplate.convertAndSend("/room/" + commentRoomSub.getRoomId(), commentRoomSub);
    }
}
