package com.ssafy.devfolio.utils;

import com.ssafy.devfolio.member.domain.MemberDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class Utility {

    public static Long getMemberIdFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((MemberDetails) authentication.getPrincipal()).getMemberId();
    }
}
