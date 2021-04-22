package com.ssafy.devfolio.member;

import com.ssafy.devfolio.member.domain.Member;
import com.ssafy.devfolio.member.domain.RoleType;
import com.ssafy.devfolio.member.domain.SocialType;
import com.ssafy.devfolio.utils.BaseTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@Rollback
class MemberServiceTest extends BaseTest {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @DisplayName("[구글]등록되지 않은 사용자인 경우 DB에 저장해야한다")
    @Test
    public void googleFirstAccessTest() {
        // given
        String email = "tester_google@test.com";
        String name = "tester" ;
        String img = "test img url";

        Map<String, String> googleInfo = new HashMap<>();
        googleInfo.put("email", email);
        googleInfo.put("name", name);
        googleInfo.put("picture", img);
        SocialType socialTypeGoogle = SocialType.GOOGLE;

        // when
        Member member = memberService.getMember(googleInfo, socialTypeGoogle);

        // then
        assertAll(
                () -> assertNotNull(member),
                () -> assertEquals(email, member.getEmail()),
                () -> assertEquals(name, member.getName()),
                () -> assertEquals(img, member.getImg()),
                () -> assertEquals(SocialType.GOOGLE, member.getSocialType()),
                () -> assertEquals(RoleType.ROLE_USER, member.getRole())
        );
    }

    @DisplayName("[구글]등록된 사용자는 기존에 있던 정보를 가져온다")
    @Test
    public void googleAfterAccessTest() {
        // given
        String email = "tester_google@test.com";
        String name = "tester" ;
        String img = "test img url";

        Member member = Member.builder()
                .email(email)
                .name(name)
                .img(img)
                .socialType(SocialType.GOOGLE)
                .role(RoleType.ROLE_USER)
                .build();

        Member savedMember = memberRepository.save(member);

        Map<String, String> googleInfo = new HashMap<>();
        googleInfo.put("email", email);
        googleInfo.put("name", name);
        googleInfo.put("picture", img);
        SocialType socialTypeGoogle = SocialType.GOOGLE;

        // when
        Member findMember = memberService.getMember(googleInfo, socialTypeGoogle);

        // then
        assertAll(
                () -> assertNotNull(findMember),
                () -> assertEquals(savedMember.getEmail(), findMember.getEmail()),
                () -> assertEquals(savedMember.getName(), findMember.getName()),
                () -> assertEquals(savedMember.getImg(), findMember.getImg()),
                () -> assertEquals(savedMember.getSocialType(), findMember.getSocialType()),
                () -> assertEquals(savedMember.getRole(), findMember.getRole())
        );
    }

    @DisplayName("[깃허브]등록되지 않은 사용자인 경우 DB에 저장해야한다")
    @Test
    public void githubFirstAccessTest() {
        // given
        String email = "tester_github@test.com";
        String name = "tester" ;
        String img = "test img url";

        Map<String, String> githubInfo = new HashMap<>();
        githubInfo.put("login", email);
        githubInfo.put("name", name);
        githubInfo.put("avatar_url", img);
        SocialType socialTypeGithub = SocialType.GITHUB;

        // when
        Member member = memberService.getMember(githubInfo, socialTypeGithub);

        // then
        assertAll(
                () -> assertNotNull(member),
                () -> assertEquals(email, member.getEmail()),
                () -> assertEquals(name, member.getName()),
                () -> assertEquals(img, member.getImg()),
                () -> assertEquals(SocialType.GITHUB, member.getSocialType()),
                () -> assertEquals(RoleType.ROLE_USER, member.getRole())
        );
    }

    @DisplayName("[깃허브]등록된 사용자는 기존에 있던 정보를 가져온다")
    @Test
    public void githubAfterAccessTest() {
        // given
        String email = "tester_github@test.com";
        String name = "tester" ;
        String img = "test img url";

        Member member = Member.builder()
                .email(email)
                .name(name)
                .img(img)
                .socialType(SocialType.GITHUB)
                .role(RoleType.ROLE_USER)
                .build();

        Member savedMember = memberRepository.save(member);

        Map<String, String> githubInfo = new HashMap<>();
        githubInfo.put("login", email);
        githubInfo.put("name", name);
        githubInfo.put("avatar_url", img);
        SocialType socialTypeGithub = SocialType.GITHUB;

        // when
        Member findMember = memberService.getMember(githubInfo, socialTypeGithub);

        // then
        assertAll(
                () -> assertNotNull(findMember),
                () -> assertEquals(savedMember.getEmail(), findMember.getEmail()),
                () -> assertEquals(savedMember.getName(), findMember.getName()),
                () -> assertEquals(savedMember.getImg(), findMember.getImg()),
                () -> assertEquals(savedMember.getSocialType(), findMember.getSocialType()),
                () -> assertEquals(savedMember.getRole(), findMember.getRole())
        );
    }
}