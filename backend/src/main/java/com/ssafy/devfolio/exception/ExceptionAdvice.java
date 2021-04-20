package com.ssafy.devfolio.exception;

import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice
public class ExceptionAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> defaultException(Exception e) {
        BaseResponse failResponse = responseService.getFailResponse(ErrorCode.INTERNAL_SERVER_ERROR);

        return ResponseEntity
                .status(failResponse.getStatus())
                .body(failResponse);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<BaseResponse> runtimeException(RuntimeException e) {
        BaseResponse failResponse = responseService.getFailResponse(ErrorCode.RUNTIME_EXCEPTION);

        return ResponseEntity
                .status(failResponse.getStatus())
                .body(failResponse);
    }

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<BaseResponse> baseException(BaseException e) {
        BaseResponse failResponse = responseService.getFailResponse(e.getErrorCode());

        return ResponseEntity
                .status(failResponse.getStatus())
                .body(failResponse);
    }

}
