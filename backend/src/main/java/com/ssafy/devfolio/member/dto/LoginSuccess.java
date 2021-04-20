package com.ssafy.devfolio.member.dto;

import com.ssafy.devfolio.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginSuccess {
    private String tokenType;
    private String token;
    private MemberDto member;

    public static LoginSuccess loginSuccess(Member member, String token) {
        return LoginSuccess.builder()
                .tokenType("Bearer")
                .token(token)
                .member(member.toMemberDto())
                .build();
    }
}
