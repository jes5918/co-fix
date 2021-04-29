package com.ssafy.devfolio.aspect;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.response.dto.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    // devfolio 하위 패키지 중 Controller로 끝나는 클래스의 모든 메서드에 적용
    @Pointcut("execution(* com.ssafy.devfolio..*Controller.*(..))")
    public void loggingPointcut() {
    }

    // exceptionController는 제외
    @Pointcut("execution(* com.ssafy.devfolio.exception.ExceptionController.*(..))")
    public void exceptionControllerPointcut() {
    }

    // 에러 발생시
    @Pointcut("execution(* com.ssafy.devfolio.exception.ExceptionAdvice.*(..))")
    public void exceptionHandlerPointcut() {
    }

    // 서버에 요청 들어온 경우
    @Before("loggingPointcut() && !exceptionControllerPointcut()")
    public void loggingRequest() {
        HttpServletRequest request = this.getCurrentRequest();


        Map<String, Object> data = new HashMap<>();

        data.put("requestURI", request.getRequestURI());
        data.put("http method", request.getMethod());
        data.put("params", this.getParams(request));

        log.info("message : {}", data);
    }

    // 에러 발생한 경우
    @Around("exceptionHandlerPointcut()")
    public Object loggingExceptionResponse(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Exception currentException = this.getCurrentException(proceedingJoinPoint);

        Object result = proceedingJoinPoint.proceed();
        ResponseEntity res = (ResponseEntity) result;

        Map<String, Object> data = new HashMap<>();

        data.put("exception", currentException.toString()); // 현재 발생한 예외
        data.put("status code", res.getStatusCodeValue());
        data.put("code", ((BaseResponse)res.getBody()).getCode());

        JSONObject message = this.toJson(data);

        log.error("message: {}", message.toJSONString());

        return result;

    }

    private HttpServletRequest getCurrentRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    private Exception getCurrentException(ProceedingJoinPoint proceedingJoinPoint) {
        return (Exception) proceedingJoinPoint.getArgs()[0];
    }

    private JSONObject toJson(Map<String, Object> data) {
        return new JSONObject(data);
    }

    private JSONObject getParams(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String param = params.nextElement();
            String replaceParam = param.replaceAll("\\.", "-");
            jsonObject.put(replaceParam, request.getParameter(param));
        }
        return jsonObject;
    }
}
