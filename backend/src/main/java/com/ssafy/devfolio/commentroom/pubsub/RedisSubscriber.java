package com.ssafy.devfolio.commentroom.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.dto.CommentRoomSub;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final RedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messageTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String body = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            CommentRoomSub commentRoomSub = objectMapper.readValue(body, CommentRoomSub.class);
            messageTemplate.convertAndSend("/room/" + commentRoomSub.getRoomId(), commentRoomSub);

        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
