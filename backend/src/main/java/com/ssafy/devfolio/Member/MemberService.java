package com.ssafy.devfolio.Member;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
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
}
