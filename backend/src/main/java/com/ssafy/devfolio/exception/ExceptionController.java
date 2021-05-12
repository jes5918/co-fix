package com.ssafy.devfolio.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@ApiIgnore
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/authentication")
    public void authenticationException() {
        throw new CustomAuthenticationEntryException(ErrorCode.UNAUTHORIZED);
    }
}
