package com.ssafy.devfolio.member.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "소켓 연결시 헤더에 필요한 회원 정보")
public class SocketMemberInfo {
    @ApiModelProperty(value = "첨삭방 ID")
    String commentRoomId;
    @ApiModelProperty(value = "사용자 닉네임")
    String nickname;

    // 첨삭방 ID나 사용자 닉네임 중 못받은 값이 있으면 예외처리
    public boolean isValid() {
        return commentRoomId != null && nickname != null;
    }
}
