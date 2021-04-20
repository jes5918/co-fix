package com.ssafy.devfolio.Member.dto;

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
}
