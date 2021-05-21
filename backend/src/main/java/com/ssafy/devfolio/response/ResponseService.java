package com.ssafy.devfolio.response;

import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.response.dto.BaseResponse;
import com.ssafy.devfolio.response.dto.ListDataResponse;
import com.ssafy.devfolio.response.dto.SingleDataResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseService {

    public enum SuccessResponse {
        SUCCESS("0000", "성공");

        String code;
        String message;

        SuccessResponse(String code, String message) {
            this.code = code;
            this.message = message;
        }

        public String getCode() {
            return this.code;
        }

        public String getMessage() {
            return this.message;
        }
    }

    public <T> SingleDataResponse<T> getSingleDataResponse(T data, HttpStatus status) {
        SingleDataResponse<T> response = new SingleDataResponse<>();
        response.setData(data);
        response.setStatus(status);

        setSuccessResult(response);

        return response;
    }

    public <T> ListDataResponse<T> getListDataResponse(List<T> data, HttpStatus status) {
        ListDataResponse<T> response = new ListDataResponse<>();
        response.setData(data);
        response.setStatus(status);

        setSuccessResult(response);

        return response;
    }

    public BaseResponse getSuccessResponse() {
        BaseResponse response = new BaseResponse();
        response.setStatus(HttpStatus.OK);
        setSuccessResult(response);

        return response;
    }

    public BaseResponse getFailResponse(ErrorCode errorCode) {
        return BaseResponse.builder()
                .success(false)
                .status(errorCode.getStatus())
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }

    public void setSuccessResult(BaseResponse response) {
        response.setSuccess(true);
        response.setCode(SuccessResponse.SUCCESS.getCode());
        response.setMessage(SuccessResponse.SUCCESS.getMessage());
    }
}
