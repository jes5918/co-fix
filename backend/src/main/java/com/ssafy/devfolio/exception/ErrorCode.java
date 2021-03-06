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

    // 첨삭방
    COMMENT_ROOM_NOT_EXIST(HttpStatus.BAD_REQUEST, "0301", "존재하지 않는 첨삭방"),
    COMMENT_ROOM_ONLY_CLOSED_BY_OWNER_EXCEPTION(HttpStatus.BAD_REQUEST, "0302", "첨삭방 만든 유저만 방 닫을 수 있음"),
    COMMENT_ROOM_ONLY_FIXED_BY_OWNER_EXCEPTION(HttpStatus.BAD_REQUEST, "0303", "첨삭방 만든 사람만 방 정보 수정 가능"),
    COMMENT_ROOM_INVALID_MEMBER_LIMIT(HttpStatus.BAD_REQUEST, "0304", "첨삭방 인원 제한은 0보다 큰 정수만 가능"),
    COMMENT_ROOM_INVALID_NICKNAME(HttpStatus.BAD_REQUEST, "0305", "잘못된 닉네임"),
    COMMENT_ROOM_CLOSED_EXCEPTION(HttpStatus.BAD_REQUEST, "0306", "이미 닫힌 첨삭방"),
    COMMENT_ROOM_FULL_EXCEPTION(HttpStatus.CONFLICT, "0307", "현재 방이 가득 참"),
    COMMENT_ROOM_FIX_MEMBER_LIMIT_EXCEPTION(HttpStatus.CONFLICT, "0308", "현재 참가자 인원보다 작은 수로는 변경할 수 없음"),

    // 감정 표현
    FEELING_MEMBER_NOT_EXIST(HttpStatus.BAD_REQUEST, "0401", "감정표현 누른 사람만 취소 가능"),
    FEELING_CANCEL_FAIL_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "0402", "감정표현 개수는 0보다 작을 수 없음"),

    // 첨삭방 내부 문장 관련
    SENTENCE_NOT_EXIST(HttpStatus.BAD_REQUEST, "0501", "존재하지 않는 문장입니다"),
    SENTENCE_ONLY_FIXED_BY_OWNER_EXCEPTION(HttpStatus.BAD_REQUEST, "0502", "방을 만든 사람만 문장 수정 가능"),

    // 코멘트 관련
    COMMENT_DISAGREE_FAIL_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "0601", "agree 개수는 0보다 작을 수 없음"),
    COMMENT_INVALID_NICKNAME_EXCEPTION(HttpStatus.BAD_REQUEST, "0602", "잘못된 닉네임"),
    COMMENT_NOT_EXIST(HttpStatus.BAD_REQUEST, "0603", "존재하지 않는 코멘트"),

    // 소켓 관련
    SOCKET_HEADER_EXCEPTION(HttpStatus.CONFLICT, "0701", "소켓 헤더 가져오는 과정에서 에러 발생"),
    SOCKET_HEADER_INFO_NOT_EXIST(HttpStatus.BAD_REQUEST, "0702", "소켓 헤더에 닉네임, 첨삭방 ID가 포함되어야함"),

    // 기타 오류 처리
    RUNTIME_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "9902", "런타임 오류"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "9903", "서버 오류"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "9904", "권한 없음"),
    FORBIDDEN(HttpStatus.FORBIDDEN, "9905", "접근 거부됨");

    private final HttpStatus status;
    private final String code;
    private final String message;

    ErrorCode(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
