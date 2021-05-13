package com.ssafy.devfolio.member;

import com.ssafy.devfolio.commentroom.CommentRoom;
import com.ssafy.devfolio.commentroom.service.CommentRoomService;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.ListDataResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.ssafy.devfolio.utils.Utility.getMemberIdFromAuthentication;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
@Api(value = "멤버 api")
public class MemberController {

    private final MemberService memberService;
    private final CommentRoomService commentRoomService;
    private final ResponseService responseService;


    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 발급받는 Bearer token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "유저가 개설한 첨삭방 목록 조회")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/commentRooms")
    public ResponseEntity getMemberRooms() {
        Long memberId = getMemberIdFromAuthentication();

        List<CommentRoom> commentRooms = commentRoomService.getMemberRooms(memberId);

        ListDataResponse<CommentRoom> response = responseService.getListDataResponse(commentRooms, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
