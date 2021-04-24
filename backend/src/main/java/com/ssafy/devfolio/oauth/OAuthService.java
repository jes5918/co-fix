package com.ssafy.devfolio.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.member.MemberRepository;
import com.ssafy.devfolio.oauth.dto.GithubOAuthRequest;
import com.ssafy.devfolio.oauth.dto.GithubOAuthResponse;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthRequest;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuthService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    final static String GOOGLE_TOKEN_BASE_URL = "https://oauth2.googleapis.com/token";
    final static String GOOGLE_INFO_BASE_URL = "https://oauth2.googleapis.com/tokeninfo";
    final static String GITHUB_TOKEN_BASE_URL = "https://github.com/login/oauth/access_token";
    final static String GITHUB_INFO_BASE_URL = "https://api.github.com/user";


    @Value("${redirect-url}")
    private String baseRedirectUrl;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;
    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;
    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;

    public GoogleOAuthResponse getGoogleAccessToken(String authorizationCode) throws JsonProcessingException {
        GoogleOAuthRequest googleOAuthRequestParam = GoogleOAuthRequest.builder()
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .code(authorizationCode)
                .redirectUri(baseRedirectUrl)
                .grantType("authorization_code")
                .build();

        ResponseEntity<String> resultEntity = restTemplate.postForEntity(GOOGLE_TOKEN_BASE_URL, googleOAuthRequestParam, String.class);

        return objectMapper.readValue(resultEntity.getBody(), new TypeReference<GoogleOAuthResponse>() {});
    }

    public Map<String, String> getGoogleInfo(String idToken) throws JsonProcessingException {
        String requestUrl = UriComponentsBuilder
                .fromHttpUrl(GOOGLE_INFO_BASE_URL)
                .queryParam("id_token", idToken).encode().toUriString();

        String resultJson = restTemplate.getForObject(requestUrl, String.class);

        return objectMapper.readValue(resultJson, new TypeReference<Map<String, String>>(){});
    }

    /**
     * Resource Server에게 Client 인증
     */
    public GithubOAuthResponse getGithubAccessToken(String authorizationCode) throws JsonProcessingException {
        GithubOAuthRequest githubOAuthRequestParam = GithubOAuthRequest.builder()
                .clientId(githubClientId)
                .clientSecret(githubClientSecret)
                .code(authorizationCode)
                .redirectUri(baseRedirectUrl)
                .build();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Accept", "application/json");
        HttpEntity httpEntity = new HttpEntity(githubOAuthRequestParam, httpHeaders);

        ResponseEntity<String> resultEntity = restTemplate.exchange(GITHUB_TOKEN_BASE_URL, HttpMethod.POST, httpEntity, String.class);

        System.out.println("resultEntity.getBody() = " + resultEntity.getBody());
        
        return objectMapper.readValue(resultEntity.getBody(), new TypeReference<GithubOAuthResponse>() {});
    }

    /**
     * Github 유저 정보 획득
     */
    public Map<String, String> getGithubInfo(String idToken) throws JsonProcessingException {
        String requestUrl = UriComponentsBuilder
                .fromHttpUrl(GITHUB_INFO_BASE_URL)
                .queryParam("id_token", idToken).encode().toUriString();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "token " + idToken);
        HttpEntity entity = new HttpEntity(httpHeaders);

        String resultJson = restTemplate.exchange(requestUrl, HttpMethod.GET, entity, String.class).getBody();

        System.out.println(resultJson);
        return objectMapper.readValue(resultJson, new TypeReference<Map<String, String>>() {});
    }


}
