package com.ssafy.devfolio.member.domain;

import com.ssafy.devfolio.entity.BaseTimeEntity;
import com.ssafy.devfolio.member.dto.MemberDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "member_email")
    private String email;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_img")
    private String img;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_social_type")
    private SocialType socialType;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role")
    private RoleType role;

    public Member updateInfo(String name, String img) {
        this.name = name;
        this.img = img;
        return this;
    }

    public MemberDto toMemberDto() {
        return MemberDto.builder()
                .id(this.id)
                .email(this.email)
                .img(this.img)
                .name(this.name)
                .socialType(this.socialType)
                .roleType(this.role)
                .build();
    }
}
