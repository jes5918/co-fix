package com.ssafy.devfolio.oauth.dto;

import lombok.Data;

@Data
public class GoogleOAuthResponse {
    private String accessToken;
    private String expiresIn;
    private String refreshToken;
    private String scope;
    private String tokenType;
    private String idToken;
}
