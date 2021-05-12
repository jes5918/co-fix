package com.ssafy.devfolio.oauth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.devfolio.member.domain.Member;
import com.ssafy.devfolio.member.MemberService;
import com.ssafy.devfolio.member.domain.SocialType;
import com.ssafy.devfolio.member.dto.LoginSuccess;
import com.ssafy.devfolio.oauth.dto.GithubOAuthResponse;
import com.ssafy.devfolio.oauth.dto.GoogleOAuthResponse;
import com.ssafy.devfolio.response.ResponseService;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import com.ssafy.devfolio.utils.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Api(value = "소셜 로그인 api")
public class OAuthController {

    private final MemberService memberService;
    private final ResponseService responseService;
    private final JwtTokenProvider jwtTokenProvider;
    private final OAuthService oAuthService;


    @ApiOperation(value = "구글 로그인", notes = "회원가입 안되어 있으면 자동으로 회원가입")
    @GetMapping("/google")
    public ResponseEntity googleAuth(@ApiParam(value = "Authorization code", required = true) @RequestParam String code) throws JsonProcessingException {
        // Access token 발급
        GoogleOAuthResponse result = oAuthService.getGoogleAccessToken(code);

        // 유저 정보 획득
        Map<String, String> userInfo = oAuthService.getGoogleInfo(result.getIdToken());

        Member member = memberService.getMember(userInfo, SocialType.GOOGLE);
        String token = jwtTokenProvider.createToken(member);

        LoginSuccess data = LoginSuccess.loginSuccess(member, token);

        SingleDataResponse<LoginSuccess> response = responseService.getSingleDataResponse(data, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "깃허브 로그인", notes = "회원가입 안되어 있으면 자동으로 회원가입")
    @GetMapping("/github")
    public ResponseEntity githubAuth(@ApiParam(value = "Authorization code", required = true) @RequestParam String code) throws JsonProcessingException {
        // Access token 발급
        GithubOAuthResponse result = oAuthService.getGithubAccessToken(code);

        // 유저 정보 획득
        Map<String, String> userInfo = oAuthService.getGithubInfo(result.getAccessToken());

        Member member = memberService.getMember(userInfo, SocialType.GITHUB);
        String token = jwtTokenProvider.createToken(member);

        LoginSuccess data = LoginSuccess.loginSuccess(member, token);

        SingleDataResponse<LoginSuccess> response = responseService.getSingleDataResponse(data, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "테스트용 로그인", notes = "테스트 종료후 삭제 예정")
    @GetMapping("/test")
    public ResponseEntity test() {
        Member testMember = memberService.getTestMember();
        String token = jwtTokenProvider.createToken(testMember);
        LoginSuccess data = LoginSuccess.loginSuccess(testMember, token);

        SingleDataResponse<LoginSuccess> response = responseService.getSingleDataResponse(data, HttpStatus.OK);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
