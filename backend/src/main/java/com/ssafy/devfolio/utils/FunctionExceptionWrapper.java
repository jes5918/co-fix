package com.ssafy.devfolio.utils;

import com.ssafy.devfolio.exception.FunctionWithException;

import java.util.function.Function;

public class FunctionExceptionWrapper {
    public static <T, R, E extends Exception> Function<T, R> wrapper(FunctionWithException<T, R, E> fe) {
        return arg -> {
            try {
                return fe.apply(arg);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }
}
