package com.ssafy.devfolio.commentroom;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.BaseResponse;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/commentRooms")
public class CommentRoomController {

    private final CommentRoomService commentRoomService;
    private final ResponseService responseService;

    @PostMapping
    public ResponseEntity createCommentRoom(@RequestBody CreateCommentRoomRequest request) throws JsonProcessingException {
        CommentRoom commentRoom = commentRoomService.createCommentRoom(request, 3l);

        SingleDataResponse<CommentRoom> response = responseService.getSingleDataResponse(commentRoom, HttpStatus.CREATED);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PatchMapping("/{commentRoomId}")
    public ResponseEntity closeCommentRoom(@PathVariable String commentRoomId) throws JsonProcessingException {
        commentRoomService.closeCommentRoom(commentRoomId, 3l);

        BaseResponse response = responseService.getSuccessResponse();

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping("/{pinNumber}")
    public ResponseEntity getCommentRoom(@PathVariable String pinNumber) throws JsonProcessingException {
        CommentRoom commentRoom = commentRoomService.getCommentRoom(pinNumber);

        SingleDataResponse<CommentRoom> response = responseService.getSingleDataResponse(commentRoom, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
