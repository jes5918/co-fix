package com.ssafy.devfolio.sentence.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "감정표현 요청")
public class FeelingRequest {
    @ApiModelProperty(value = "감정표현한 사람 닉네임")
    private String nickname;
    @ApiModelProperty(value = "감정표현한 사람 타입")
    private FeelingType feelingType;
}
