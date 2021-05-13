package com.ssafy.devfolio.commentroom.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.dto.CommentRoomSocket;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final RedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messageTemplate;


    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String body = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            CommentRoomSocket commentRoomSocket = objectMapper.readValue(body, CommentRoomSocket.class);
            messageTemplate.convertAndSend("/room/" + commentRoomSocket.getRoomId(), commentRoomSocket);

        } catch (Exception e) {
        }
    }
}
