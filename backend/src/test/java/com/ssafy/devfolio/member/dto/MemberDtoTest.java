package com.ssafy.devfolio.member.dto;

import com.ssafy.devfolio.member.domain.SocialType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class MemberDtoTest {

    private String email = "tester@test.com";
    private String name = "tester" ;
    private String img = "test img url";

    @DisplayName("[구글]사용자 정보 받아 DTO 생성")
    @Test
    void initGoogleInfoTest() {
        // given
        Map<String, String> googleInfo = new HashMap<>();
        googleInfo.put("email", email);
        googleInfo.put("name", name);
        googleInfo.put("picture", img);
        SocialType socialTypeGoogle = SocialType.GOOGLE;

        // when
        MemberDto memberDto = MemberDto.initSocialInfo(googleInfo, socialTypeGoogle);

        // then
        assertAll(
                () -> assertNotNull(memberDto),
                () -> assertEquals(email, memberDto.getEmail()),
                () -> assertEquals(name, memberDto.getName()),
                () -> assertEquals(img, memberDto.getImg())
        );
    }

    @DisplayName("[깃허브]사용자 정보 받아 DTO 생성")
    @Test
    void initGithubInfoTest() {
        // given
        Map<String, String> githubInfo = new HashMap<>();
        githubInfo.put("login", email);
        githubInfo.put("name", name);
        githubInfo.put("avatar_url", img);
        SocialType socialTypeGithub = SocialType.GITHUB;

        // when
        MemberDto memberDto = MemberDto.initSocialInfo(githubInfo, socialTypeGithub);

        // then
        assertAll(
                () -> assertNotNull(memberDto),
                () -> assertEquals(email, memberDto.getEmail()),
                () -> assertEquals(name, memberDto.getName()),
                () -> assertEquals(img, memberDto.getImg())
        );
    }
}