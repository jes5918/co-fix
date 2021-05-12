package com.ssafy.devfolio.sentence.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "문장 수정 정보")
public class SentenceFixRequest {
    @ApiModelProperty(value = "첨삭방 id")
    private String roomId;
    @ApiModelProperty(value = "수정할 내용")
    private String modifiedContent;
}
