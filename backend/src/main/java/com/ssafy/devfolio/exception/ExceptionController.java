package com.ssafy.devfolio.exception;

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
        throw new BaseException(ErrorCode.UNAUTHORIZED);
    }

    @GetMapping("/accessdenied")
    public void accessDeniedException() {
        throw new BaseException(ErrorCode.FORBIDDEN);
    }
}
