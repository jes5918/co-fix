package com.ssafy.devfolio.member.dto;

import com.ssafy.devfolio.member.domain.Member;
import com.ssafy.devfolio.member.domain.RoleType;
import com.ssafy.devfolio.member.domain.SocialType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;


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

    public static MemberDto initSocialInfo(Map<String, String> userInfo, SocialType socialType) {
        MemberDto memberDto = new MemberDto();
        memberDto.setSocialType(socialType);

        if("GOOGLE".equals(socialType.getSocialType())){
            memberDto.setEmail(userInfo.get("email"));
            memberDto.setName(userInfo.get("name"));
            memberDto.setImg(userInfo.get("picture"));
        } else if ("GITHUB".equals(socialType.getSocialType())) {
            memberDto.setEmail(userInfo.get("login"));
            memberDto.setName(userInfo.get("name"));
            memberDto.setImg(userInfo.get("avatar_url"));
        }

        return memberDto;
    }
}
