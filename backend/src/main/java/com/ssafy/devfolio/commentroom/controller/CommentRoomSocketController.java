package com.ssafy.devfolio.commentroom.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.service.CommentRoomService;
import com.ssafy.devfolio.sentence.Sentence;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value = "첨삭 방 소켓 통신")
public class CommentRoomSocketController {

    private final CommentRoomService commentRoomService;

    /**
     * websocket "/pub/message"
     * <p>
     * 첨삭방(CommentRoom)에 대한 전체 메세징 처리
     */
    @MessageMapping("/message")
    public void message(CommentRoom commentRoom) throws JsonProcessingException {

        commentRoomService.sendCommentRoom(commentRoom);
    }

    @MessageMapping("/feeling")
    public void message(Sentence sentence) throws JsonProcessingException {

        commentRoomService.sendCommentRoomFeeling(sentence);

    }

}
