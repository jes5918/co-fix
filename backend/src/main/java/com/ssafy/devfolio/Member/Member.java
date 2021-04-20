package com.ssafy.devfolio.Member;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.devfolio.Member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

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
