package com.ssafy.devfolio.member.domain;

import com.ssafy.devfolio.member.MemberRepository;
import com.ssafy.devfolio.member.dto.MemberDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@Rollback
class MemberTest {

    @PersistenceContext
    EntityManager em;

    @Autowired
    MemberRepository memberRepository;

    @DisplayName("이름, 프로필 이미지 정보 수정")
    @Test
    public void updateInfoTest() {
        // given
        String firstName = "tester";
        String firstImg = "tester img url";
        String newName = "new name";
        String newImg = "tester new img";

        Member member = Member.builder()
                .email("tester@test.com")
                .name(firstName)
                .img(firstImg)
                .role(RoleType.ROLE_USER)
                .socialType(SocialType.GOOGLE)
                .build();
        Member savedMember = memberRepository.save(member);

        // when
        member.updateInfo(newName, newImg);
        em.flush();
        em.clear();

        // then
        Member findMember = memberRepository.findById(savedMember.getId()).get();

        assertAll(
                () -> assertEquals(newName, findMember.getName()),
                () -> assertEquals(newImg, findMember.getImg())
        );
    }

    @DisplayName("Member -> MemberDto 변환 테스트")
    @Test
    public void toMemberDtoTest() {
        // given
        Member member = Member.builder()
                .email("tester@test.com")
                .name("tester")
                .img("tester img url")
                .role(RoleType.ROLE_USER)
                .socialType(SocialType.GOOGLE)
                .build();
        Member savedMember = memberRepository.save(member);

        // when
        MemberDto memberDto = member.toMemberDto();

        // test
        assertAll(
                () -> assertNotNull(memberDto),
                () -> assertEquals(memberDto.getId(), savedMember.getId()),
                () -> assertEquals(memberDto.getEmail(), savedMember.getEmail()),
                () -> assertEquals(memberDto.getName(), savedMember.getName()),
                () -> assertEquals(memberDto.getImg(), savedMember.getImg()),
                () -> assertEquals(memberDto.getSocialType(), savedMember.getSocialType()),
                () -> assertEquals(memberDto.getRoleType(), savedMember.getRole())
        );
    }
}