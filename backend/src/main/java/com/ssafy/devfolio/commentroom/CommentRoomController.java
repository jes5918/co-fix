package com.ssafy.devfolio.commentroom;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.commentroom.dto.CreateCommentRoomRequest;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.BaseResponse;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/commentRooms")
public class CommentRoomController {

    private final CommentRoomService commentRoomService;
    private final ResponseService responseService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 발급받는 Bearer token", required = true, dataType = "String", paramType = "header")
    })
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping
    public ResponseEntity createCommentRoom(@RequestBody CreateCommentRoomRequest request) throws JsonProcessingException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long memberId = Long.parseLong(authentication.getName());

        if (request.getMemberLimit() <= 0) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_INVALID_MEMBER_LIMIT);
        }

        CommentRoom commentRoom = commentRoomService.createCommentRoom(request, memberId);

        SingleDataResponse<CommentRoom> response = responseService.getSingleDataResponse(commentRoom, HttpStatus.CREATED);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 발급받는 Bearer token", required = true, dataType = "String", paramType = "header")
    })
    @PreAuthorize("hasRole('ROLE_USER')")
    @PatchMapping("/{commentRoomId}")
    public ResponseEntity closeCommentRoom(@PathVariable String commentRoomId) throws JsonProcessingException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long memberId = Long.parseLong(authentication.getName());

        commentRoomService.closeCommentRoom(commentRoomId, memberId);

        BaseResponse response = responseService.getSuccessResponse();

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @GetMapping("/{pinNumber}")
    public ResponseEntity getCommentRoom(@PathVariable String pinNumber) throws JsonProcessingException {
        CommentRoom commentRoom = commentRoomService.getCommentRoom(pinNumber);

        SingleDataResponse<CommentRoom> response = responseService.getSingleDataResponse(commentRoom, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 발급받는 Bearer token", required = true, dataType = "String", paramType = "header")
    })
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/{commentRoomId}")
    public ResponseEntity fixCommentRoomInfo(@PathVariable String commentRoomId,
                                             @RequestParam(value = "roomTitle", required = false) String roomTitle,
                                             @RequestParam(value = "memberLimit", required = false, defaultValue = "0") int memberLimit) throws JsonProcessingException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        long memberId = Long.parseLong(authentication.getName());

        if (roomTitle != null) {
            commentRoomService.fixRoomtitle(commentRoomId, roomTitle, memberId);
        }
        if (memberLimit != 0) {
            commentRoomService.fixMemberLimit(commentRoomId, memberLimit, memberId);
        }

        BaseResponse response = responseService.getSuccessResponse();

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
