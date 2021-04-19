package com.ssafy.devfolio.oauth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class GoogleOAuthRequest {
    private String clientId;
    private String clientSecret;
    private String code;
    private String grantType;
    private String redirectUri;
}
