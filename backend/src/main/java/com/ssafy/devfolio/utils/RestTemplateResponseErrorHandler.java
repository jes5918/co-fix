package com.ssafy.devfolio.utils;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;

import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR;

public class RestTemplateResponseErrorHandler implements ResponseErrorHandler {
    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return (response.getStatusCode().series() == CLIENT_ERROR
                || response.getStatusCode().series() == SERVER_ERROR);
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        if (response.getStatusCode().series() == SERVER_ERROR) {
            throw new BaseException(ErrorCode.INTERNAL_SERVER_ERROR);
        } else if (response.getStatusCode().series() == CLIENT_ERROR) {
            throw new BaseException(ErrorCode.SOCIAL_REQUEST_ERROR);
        }
    }
}
