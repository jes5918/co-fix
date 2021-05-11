package com.ssafy.devfolio.sentence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.BaseResponse;
import com.ssafy.devfolio.response.dto.ListDataResponse;
import com.ssafy.devfolio.sentence.dto.SentenceFixRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/documents")
public class SentenceController {

    private final SentenceService sentenceService;
    private final ResponseService responseService;

    @GetMapping("/{documentId}")
    public ResponseEntity getDocument(@PathVariable String documentId) {
        List<Sentence> document = sentenceService.getDocument(documentId);

        ListDataResponse<Sentence> response = responseService.getListDataResponse(document, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/{documentId}/sentences/{sentenceId}")
    public ResponseEntity fixSentence(@PathVariable String documentId,
                                      @PathVariable String sentenceId,
                                      @RequestBody SentenceFixRequest request) throws JsonProcessingException {
        sentenceService.fixSentence(3l, documentId, sentenceId, request);

        BaseResponse response = responseService.getSuccessResponse();

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
