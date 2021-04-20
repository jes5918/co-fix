package com.ssafy.devfolio.oauth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.ssafy.devfolio.Member.Member;
import com.ssafy.devfolio.Member.MemberDetails;
import com.ssafy.devfolio.Member.MemberRepository;
import com.ssafy.devfolio.Member.SocialType;
import com.ssafy.devfolio.Member.dto.LoginSuccess;
import com.ssafy.devfolio.Member.dto.MemberDto;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthRequest;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthResponse;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import com.ssafy.devfolio.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class OAuthController {

    private final ResponseService responseService;
    private final JwtTokenProvider jwtTokenProvider;
    private final OAuthService oAuthService;


    @GetMapping("/google")
    public ResponseEntity googleAuth(@RequestBody String code) throws JsonProcessingException {
        // Access token 발급
        GoogleOAuthResponse result = oAuthService.getGoogleAccessToken(code);

        // 유저 정보 획득
        Map<String, String> userInfo = oAuthService.getGoogleInfo(result.getIdToken());

        Member member = oAuthService.getMember(userInfo, SocialType.GOOGLE);
        MemberDetails memberDetails = new MemberDetails(member);
        String token = jwtTokenProvider.createToken(member.getId(), memberDetails.getAuthorities());

        MemberDto memberDto = member.toMemberDto();

        LoginSuccess data = LoginSuccess.builder()
                .tokenType("Bearer")
                .token(token)
                .member(memberDto)
                .build();

        SingleDataResponse<LoginSuccess> response = responseService.getSingleDataResponse(data, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
