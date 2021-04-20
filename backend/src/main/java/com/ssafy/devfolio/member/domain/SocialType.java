package com.ssafy.devfolio.member.domain;

import lombok.Getter;

@Getter
public enum SocialType {
    GOOGLE("GOOGLE"), GITHUB("GITHUB");

    private String socialType;

    SocialType(String socialType) {
        this.socialType = socialType;
    }
}
