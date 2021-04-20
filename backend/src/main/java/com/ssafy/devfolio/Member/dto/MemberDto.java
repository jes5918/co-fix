package com.ssafy.devfolio.Member.dto;

import com.ssafy.devfolio.Member.Member;
import com.ssafy.devfolio.Member.RoleType;
import com.ssafy.devfolio.Member.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private Long id;
    private String email;
    private String name;
    private String img;
    private  RoleType roleType;
    private SocialType socialType;

    public Member toUserMember() {
        return Member.builder()
                .email(this.email)
                .name(this.name)
                .img(this.img)
                .socialType(this.socialType)
                .role(RoleType.ROLE_USER)
                .build();
    }
}
