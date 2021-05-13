package com.ssafy.devfolio.comment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.comment.dto.CommentRequest;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.ListDataResponse;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/documents/{documentId}")
@Api(value = "코멘트 api. 경로에 문서 id 필수")
public class CommentController {

    private final ResponseService responseService;
    private final CommentService commentService;

    @ApiOperation(value = "문장에 코멘트 작성")
    @PostMapping("/sentences/{sentenceId}/comments")
    public ResponseEntity writeComment(@ApiParam(value = "문서 id", required = true) @PathVariable String documentId,
                                       @ApiParam(value = "문장 id", required = true) @PathVariable String sentenceId,
                                       @ApiParam(value = "코멘트 작성 정보", required = true) @RequestBody CommentRequest request) throws JsonProcessingException {

        Comment comment = commentService.writeComment(documentId, sentenceId, request);

        SingleDataResponse<Comment> response = responseService.getSingleDataResponse(comment, HttpStatus.CREATED);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "문장에 달린 코멘트 조회")
    @GetMapping("/sentences/{sentenceId}/comments")
    public ResponseEntity getComments(@ApiParam(value = "문서 id", required = true) @PathVariable String documentId,
                                       @ApiParam(value = "문장 id", required = true) @PathVariable String sentenceId) throws JsonProcessingException {
        List<Comment> comments = commentService.getComments(sentenceId);

        ListDataResponse<Comment> response = responseService.getListDataResponse(comments, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
