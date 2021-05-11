package com.ssafy.devfolio.commentroom.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.commentroom.CommentRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisSubscriber {

    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messageTemplate;

    /**
     * Redis에서 메세지가 발행(Publish)되면 대기하고 있던 Redis Subscriber가 해당 메세지를 받아 처리
     *
     * - 메세지 종류
     * 1. 첨삭 방
     *      문장 수정, 그 외로 분리?? -> 일단 다 보내고 생각(CommentRoom 전체)
     * 2. 첨삭 (문장 내)
     *
     * >>>>> CommentMessage를 따로 만들어야 하는가???
     */
    public void sendRoomMessage(String publishMessage) throws JsonProcessingException {
        // 첨삭방(CommentRoom) 객체로 매핑
        CommentRoom room = objectMapper.readValue(publishMessage, CommentRoom.class);

        // 첨삭방을 구독(Subscribe)한 클라이언트에게 메세지 발송
        messageTemplate.convertAndSend("/room/" + room.getRoomId(), room);
    }

}
