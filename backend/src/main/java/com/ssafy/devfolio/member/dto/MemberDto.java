package com.ssafy.devfolio.member.dto;

import com.ssafy.devfolio.member.domain.Member;
import com.ssafy.devfolio.member.domain.RoleType;
import com.ssafy.devfolio.member.domain.SocialType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "회원 정보")
public class MemberDto {
    @ApiModelProperty(value = "회원 아이디(PK)")
    private Long id;
    @ApiModelProperty(value = "회원 이메일(깃허브는 로그인 id)")
    private String email;
    @ApiModelProperty(value = "회원 이름")
    private String name;
    @ApiModelProperty(value = "회원 프로필 사진")
    private String img;
    @ApiModelProperty(value = "회원 권한(ROLE_USER / ROLE_ADMIN)")
    private  RoleType roleType;
    @ApiModelProperty(value = "회원 소셜 로그인 타입(GITHUB / GOOGLE)")
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
