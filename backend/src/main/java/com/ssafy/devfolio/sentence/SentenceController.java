package com.ssafy.devfolio.sentence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.commentroom.pubsub.RedisSenderService;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.BaseResponse;
import com.ssafy.devfolio.response.dto.ListDataResponse;
import com.ssafy.devfolio.sentence.dto.FeelingRequest;
import com.ssafy.devfolio.sentence.dto.SentenceFixRequest;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.devfolio.utils.Utility.getMemberIdFromAuthentication;

@RestController
@RequiredArgsConstructor
@RequestMapping("/commentRooms/{commentRoomId}/documents")
@Api(value = "문장 api. 방id 필수")
public class SentenceController {

    private final SentenceService sentenceService;
    private final RedisSenderService redisSenderService;
    private final ResponseService responseService;

    @ApiOperation(value = "문서 조회", notes = "문서 id를 이용해 문서 내부 문장 전체 조회")
    @GetMapping("/{documentId}")
    public ResponseEntity getDocument(@ApiParam(value = "첨삭방 id", required = true) @PathVariable String commentRoomId,
                                      @ApiParam(value = "문서 id", required = true) @PathVariable String documentId) {
        List<Sentence> document = sentenceService.getDocument(documentId);

        ListDataResponse<Sentence> response = responseService.getListDataResponse(document, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "Authorization", value = "로그인 성공 후 발급받는 Bearer token", required = true, dataType = "String", paramType = "header")
    })
    @ApiOperation(value = "문장 수정", notes = "첨삭방 개설자만 문장 수정 가능")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/{documentId}/sentences/{sentenceId}")
    public ResponseEntity fixSentence(@ApiParam(value = "첨삭방 id", required = true) @PathVariable String commentRoomId,
                                      @ApiParam(value = "문서 id", required = true) @PathVariable String documentId,
                                      @ApiParam(value = "문장 id", required = true) @PathVariable String sentenceId,
                                      @ApiParam(value = "문장 수정 정보", required = true) @RequestBody SentenceFixRequest request) throws JsonProcessingException {
        Long memberId = getMemberIdFromAuthentication();

        sentenceService.fixSentence(memberId, documentId, sentenceId, request);

        BaseResponse response = responseService.getSuccessResponse();

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "문장 감정표현 - 테스트용 (소켓 연결 후 제거 예정)", notes = "이미 감정표현 한 사람이 또 하면 취소")
    @PostMapping("/{documentId}/sentences/{sentenceId}/feelings")
    public ResponseEntity pressFeeling(@ApiParam(value = "첨삭방 id", required = true) @PathVariable String commentRoomId,
                                       @ApiParam(value = "문서 id", required = true) @PathVariable String documentId,
                                       @ApiParam(value = "문장 id", required = true) @PathVariable String sentenceId,
                                       @ApiParam(value = "감정표현 정보", required = true) @RequestBody FeelingRequest request) throws JsonProcessingException {
        Sentence sentence = sentenceService.pressFeeling(documentId, sentenceId, request);

        redisSenderService.sendSentenceUpdateService(roomId, sentence);


        BaseResponse response = responseService.getSuccessResponse();

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
