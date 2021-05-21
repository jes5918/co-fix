package com.ssafy.devfolio.member.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@ApiModel(value = "첨삭방 참여 유저")
public class JoinMember implements Serializable {
    @ApiModelProperty(value = "닉네임")
    private String nickname;
    @ApiModelProperty(value = "온라인 여부")
    private boolean isOnline;

    public static JoinMember newMember(String nickname) {
        JoinMember joinMember = new JoinMember();

        joinMember.nickname = nickname;
        joinMember.isOnline = true;

        return joinMember;
    }

    public void exit() {
        this.isOnline = false;
    }

    public void enter() {
        this.isOnline = true;
    }
}
