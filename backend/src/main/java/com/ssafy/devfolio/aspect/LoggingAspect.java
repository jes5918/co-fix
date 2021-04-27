package com.ssafy.devfolio.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.Map;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    // devfolio 하위 패키지 중 Controller로 끝나는 클래스의 모든 메서드에 적용
    @Pointcut("execution(* com.ssafy.devfolio..*Controller.*(..))")
    public void loggingPointCut() {
    }

    // exceptionController는 제외
    @Pointcut("execution(* com.ssafy.devfolio.exception.ExceptionController.*(..))")
    public void exceptionControllerPointCut() {
    }

    @Before("loggingPointCut() && !exceptionControllerPointCut()")
    public void loggingRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        StringBuilder sb = new StringBuilder();

        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String param = params.nextElement();
            String replaceParam = param.replaceAll("\\.", "-");
            sb.append(replaceParam).append(" : ").append(request.getParameter(param));
        }

        log.info("{} {} : param: {}", method, requestURI, sb.toString());
    }
}
