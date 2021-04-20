package com.ssafy.devfolio.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.devfolio.Member.Member;
import com.ssafy.devfolio.Member.MemberRepository;
import com.ssafy.devfolio.Member.SocialType;
import com.ssafy.devfolio.Member.dto.MemberDto;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthRequest;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;
    @Value("${redirect-url}")
    private String googleBaseRedirectUrl;

    public GoogleOAuthResponse getGoogleAccessToken(String authorizationCode) throws JsonProcessingException {
        GoogleOAuthRequest googleOAuthRequestParam = GoogleOAuthRequest.builder()
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .code(authorizationCode)
                .redirectUri(googleBaseRedirectUrl + "/google")
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

    public Member getMember(Map<String, String> userInfo, SocialType socialType) {
        String email = userInfo.get("email");
        String name = userInfo.get("name");
        String img = userInfo.get("picture");

        MemberDto memberDto = MemberDto.builder()
                .email(email)
                .name(name)
                .img(img)
                .socialType(socialType)
                .build();

        Member member = memberRepository.findByEmail(email)
                .map(m -> m.updateInfo(m.getName(), m.getImg()))
                .orElse(memberDto.toUserMember());

        return memberRepository.save(member);
    }
}
