package com.ssafy.devfolio.sentence;

import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.ListDataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
