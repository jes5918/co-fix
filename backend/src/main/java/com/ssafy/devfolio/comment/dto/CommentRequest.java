package com.ssafy.devfolio.comment.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "코멘트 요청")
public class CommentRequest {
    @ApiModelProperty(value = "코멘트 내용")
    private String content;
    @ApiModelProperty(value = "닉네임")
    private String nickname;
}
