package com.ssafy.devfolio.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.commentroom.service.CommentRoomService;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.member.dto.SocketMemberInfo;
import com.ssafy.devfolio.response.dto.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class SocketChannelInterceptor implements ChannelInterceptor {

    @Autowired private Map<String, SocketMemberInfo> sessionInfoMap;
    @Autowired private CommentRoomService commentRoomService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        MessageHeaders headers = message.getHeaders();
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String sessionId = accessor.getSessionId();

        Map<String, Object> logData = new HashMap<>();

        try {
            switch (accessor.getCommand()) {
                case CONNECT:
                    // 연결된 경우 header에서 nickname, roomId값을 가져오고 sessionId를 Key로 하는 Map에 저장함
                    MultiValueMap<String, String> multiValueMap = headers.get(StompHeaderAccessor.NATIVE_HEADERS, MultiValueMap.class);

                    SocketMemberInfo socketMemberInfo = new SocketMemberInfo();
                    for (Map.Entry<String, List<String>> header : multiValueMap.entrySet()) {
                        switch (header.getKey()) {
                            case "nickname":
                                socketMemberInfo.setNickname(header.getValue().get(0));
                                break;
                            case "commentRoomId":
                                socketMemberInfo.setCommentRoomId(header.getValue().get(0));
                                break;
                            default:
                        }
                    }
                    if (socketMemberInfo.isValid()) {
                        sessionInfoMap.put(sessionId, socketMemberInfo);
                    } else {
                        throw new BaseException(ErrorCode.SOCKET_HEADER_INFO_NOT_EXIST);
                    }

                    logData.put("status", "connect");
                    logData.put("sessionId", sessionId);
                    logData.put("nickname", socketMemberInfo.getNickname());
                    logData.put("commentRoomId", socketMemberInfo.getCommentRoomId());

                    log.info("websocket message : {}", logData);
                    break;
                case DISCONNECT:
                    // 웹소켓 연결 끊긴 경우 해당 유저 sessionId 제거 및 첨삭방 퇴장 처리
                    SocketMemberInfo currentSession = sessionInfoMap.remove(sessionId);
                    if (currentSession != null) {
                        commentRoomService.exitCommentRoom(currentSession);

                        logData.put("status", "disconnect");
                        logData.put("sessionId", sessionId);
                        logData.put("nickname", currentSession.getNickname());
                        logData.put("commentRoomId", currentSession.getCommentRoomId());

                        log.info("websocket message : {}", logData);
                    } else {
                        log.info("message : {} 이미 끊어진 session", sessionId);
                    }
            }
        } catch (NullPointerException exception) {
            throw new BaseException(ErrorCode.SOCKET_HEADER_EXCEPTION);
        } catch (JsonProcessingException e) {
            throw new BaseException(ErrorCode.RUNTIME_EXCEPTION);
        }


        return message;
    }
}