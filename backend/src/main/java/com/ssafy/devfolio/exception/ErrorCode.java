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

    // 소셜 로그인
    SOCIAL_REQUEST_ERROR(HttpStatus.BAD_REQUEST, "0201", "소셜 로그인 진행 중 오류 발생"),

    // 오류 처리
    RUNTIME_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "9902", "런타임 오류"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "9903", "서버 오류"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "9904", "권한 없음"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "9905", "인증되지 않은 접근");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
