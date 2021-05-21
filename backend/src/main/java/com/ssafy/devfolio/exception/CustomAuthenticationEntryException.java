package com.ssafy.devfolio.exception;

public class CustomAuthenticationEntryException extends BaseException{

    public CustomAuthenticationEntryException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }

    public CustomAuthenticationEntryException(ErrorCode errorCode) {
        super(errorCode);
    }
}
