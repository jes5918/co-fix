package com.ssafy.devfolio.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    /*
     * ErrorCode Convention
     * 1, 2번째 숫자 : 서비스 종류
     * 3, 4번째 숫자 : 세부 번호
     * ex) 01(서비스종류)01(번호)
     *
     * HttpStatus는 상황에 최대한 맞춰서 적용
     */

    // 회원 관련
    MEMBER_DUPLICATED_EMAIL(HttpStatus.CONFLICT,"0101", "중복된 이메일"),
    MEMBER_NOT_EXIST(HttpStatus.NOT_FOUND, "0102", "존재하지 않는 유저"),


    // 오류 처리
    RUNTIME_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "002", "런타임 오류"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "003", "서버 오류");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
