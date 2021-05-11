package com.ssafy.devfolio.commentroom.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "첨삭방 생성 정보")
public class CreateCommentRoomRequest {
    @ApiModelProperty(value = "첨삭방 제목")
    private String roomTitle;
    @ApiModelProperty(value = "인원수 제한(1이상 정수)")
    private int memberLimit;
    @ApiModelProperty(value = "첨삭 받을 내용")
    private String contents;
}
