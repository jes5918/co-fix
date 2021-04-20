package com.ssafy.devfolio.oauth.dto;

import lombok.Data;

@Data
public class GithubOAuthResponse {

    private String accessToken;
    private String expiresIn;
    private String refreshToken;
    private String refreshTokenExpiresIn;
    private String scope;
    private String tokenType;

}
