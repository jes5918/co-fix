package com.ssafy.devfolio.response.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "기본 응답 포맷")
public class BaseResponse {
    @ApiModelProperty(value = "요청 성공 여부 (true / false)")
    private boolean success;
    @ApiModelProperty(value = "Http Status (OK, NOT FOUND, ...)")
    private HttpStatus status;
    @ApiModelProperty(value = "응답에 대한 상세 코드")
    private String code;
    @ApiModelProperty(value = "응답에 대한 설명")
    private String message;
}
