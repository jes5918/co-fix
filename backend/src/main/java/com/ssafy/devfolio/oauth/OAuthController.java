package com.ssafy.devfolio.oauth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.ssafy.devfolio.Member.Member;
import com.ssafy.devfolio.Member.MemberDetails;
import com.ssafy.devfolio.Member.MemberRepository;
import com.ssafy.devfolio.Member.dto.MemberDto;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthRequest;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthResponse;
import com.ssafy.devfolio.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class OAuthController {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    final static String GOOGLE_TOKEN_BASE_URL = "https://oauth2.googleapis.com/token";

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;
    @Value("${redirect-url}")
    private String baseRedirectUrl;


    @GetMapping("/test")
    public void errorTest() {
        throw new RuntimeException();
    }

    @GetMapping("/test2")
    public void errorTest2() {
        throw new BaseException(ErrorCode.DUPLICATED_EMAIL);
    }

    @GetMapping("/google")
    public ResponseEntity googleAuth(@RequestParam("code") String authorizationCode) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        // Access token 발급
        GoogleOAuthResponse result = getGoogleAccessToken(authorizationCode, objectMapper, restTemplate);

        // 유저 정보 획득
        Map<String,String> userInfo = getGoogleInfo(result.getIdToken(), objectMapper, restTemplate);

        Member member = getMember(userInfo);
        MemberDetails memberDetails = new MemberDetails(member);
        String token = jwtTokenProvider.createToken(member.getId(), memberDetails.getAuthorities());

        return ResponseEntity.status(HttpStatus.OK).body("Bearer " + token);
    }

    private GoogleOAuthResponse getGoogleAccessToken(String authorizationCode, ObjectMapper objectMapper, RestTemplate restTemplate) throws JsonProcessingException {
        GoogleOAuthRequest googleOAuthRequestParam = GoogleOAuthRequest.builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .code(authorizationCode)
                .redirectUri(baseRedirectUrl + "/google")
                .grantType("authorization_code")
                .build();

        ResponseEntity<String> resultEntity = restTemplate.postForEntity(GOOGLE_TOKEN_BASE_URL, googleOAuthRequestParam, String.class);

        return objectMapper.readValue(resultEntity.getBody(), new TypeReference<GoogleOAuthResponse>() {});
    }

    private Map<String, String> getGoogleInfo(String idToken, ObjectMapper objectMapper, RestTemplate restTemplate) throws JsonProcessingException {
        String requestUrl = UriComponentsBuilder
                .fromHttpUrl("https://oauth2.googleapis.com/tokeninfo")
                .queryParam("id_token", idToken).encode().toUriString();

        String resultJson = restTemplate.getForObject(requestUrl, String.class);

        return objectMapper.readValue(resultJson, new TypeReference<Map<String, String>>(){});
    }

    private Member getMember(Map<String, String> userInfo) {
        String email = userInfo.get("email");
        String name = userInfo.get("name");
        String img = userInfo.get("picture");

        MemberDto memberDto = MemberDto.builder()
                .email(email)
                .name(name)
                .img(img)
                .build();

        Member member = memberRepository.findByEmail(email)
                .map(m -> m.updateInfo(m.getName(), m.getImg()))
                .orElse(memberDto.toMember());

        return memberRepository.save(member);
    }

}
