package com.ssafy.devfolio.member;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.member.domain.Member;
import com.ssafy.devfolio.member.domain.MemberDetails;
import com.ssafy.devfolio.member.domain.SocialType;
import com.ssafy.devfolio.member.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
        return memberRepository.findById(Long.valueOf(memberId))
                .map(this::addAuthorities)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_EXIST));

    }

    private MemberDetails addAuthorities(Member m) {
        MemberDetails memberDetails = new MemberDetails(m);
        memberDetails.setAuthorities(Collections.singletonList(new SimpleGrantedAuthority(m.getRole().getRole())));

        return memberDetails;
    }

    /**
     * 저장
     */
    @Transactional
    public Member getMember(Map<String, String> userInfo, SocialType socialType) {
        MemberDto memberDto = MemberDto.initSocialInfo(userInfo, socialType);

        Member member = memberRepository.findByEmail(memberDto.getEmail())
                .map(m -> m.updateInfo(memberDto.getName(), memberDto.getImg()))
                .orElseGet(() -> memberDto.toUserMember());

        return memberRepository.save(member);
    }

} 
