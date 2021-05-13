package com.ssafy.devfolio.commentroom.dto;

import com.ssafy.devfolio.commentroom.RoomStatus;
import com.ssafy.devfolio.member.dto.JoinMember;
import com.ssafy.devfolio.sentence.Sentence;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentRoomSocket {

    @ApiModelProperty(value = "첨삭방 id")
    private String roomId;
    @ApiModelProperty(value = "첨삭방 제목")
    private String roomTitle;
    
    @ApiModelProperty(value = "각 문장들과 정보들")
    private Sentence sentence;

    @ApiModelProperty(value = "첨삭방 상태(OPEN, CLOSED)")
    private RoomStatus status;
    @ApiModelProperty(value = "첨삭방 참여 인원 목록")
    private List<JoinMember> members;

    @ApiModelProperty(value = "최근 수정 날짜")
    private LocalDateTime lastModifiedDate;

}
