package com.ssafy.devfolio.member.dto;

import com.ssafy.devfolio.member.domain.Member;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "로그인 성공")
public class LoginSuccess {
    @ApiModelProperty(value = "토큰 타입")
    private String tokenType;
    @ApiModelProperty(value = "token 값")
    private String token;
    @ApiModelProperty(value = "로그인한 유저 정보")
    private MemberDto member;

    public static LoginSuccess loginSuccess(Member member, String token) {
        return LoginSuccess.builder()
                .tokenType("Bearer")
                .token(token)
                .member(member.toMemberDto())
                .build();
    }
}
