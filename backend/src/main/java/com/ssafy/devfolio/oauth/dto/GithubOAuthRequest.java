package com.ssafy.devfolio.oauth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class GithubOAuthRequest {

    private String clientId;
    private String clientSecret;
    private String code;
    private String redirectUri;

}
