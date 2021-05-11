package com.ssafy.devfolio.commentroom;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.response.ResponseService;
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

}
