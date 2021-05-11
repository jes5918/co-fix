package com.ssafy.devfolio.commentroom;

import com.ssafy.devfolio.commentroom.dto.CreateCommentRoomRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@ApiModel(value = "첨삭방")
public class CommentRoom implements Serializable {

    @ApiModelProperty(value = "첨삭방 id")
    private String roomId;
    @ApiModelProperty(value = "첨삭방 개설자 id")
    private Long memberId;
    @ApiModelProperty(value = "첨삭방 제목")
    private String roomTitle;
    @ApiModelProperty(value = "첨삭방 인원 제한 (1이상 정수)")
    private int memberLimit;
    @ApiModelProperty(value = "첨삭할 문서 id")
    private String documentId;
    @ApiModelProperty(value = "첨삭방 핀번호")
    private String pinNumber;
    @ApiModelProperty(value = "첨삭방 상태(OPEN, CLOSED)")
    private RoomStatus status;
    @ApiModelProperty(value = "첨삭방 생성 날짜")
    private LocalDateTime createdDate;
    @ApiModelProperty(value = "최근 수정 날짜")
    private LocalDateTime lastModifiedDate;

    public static CommentRoom createCommentRoom(CreateCommentRoomRequest request, Long memberId) {
        CommentRoom commentRoom = new CommentRoom();

        commentRoom.roomId = UUID.randomUUID().toString();
        commentRoom.roomTitle = request.getRoomTitle();
        commentRoom.memberLimit = request.getMemberLimit();
        commentRoom.memberId = memberId;
        commentRoom.status = RoomStatus.OPEN;
        commentRoom.createdDate = LocalDateTime.now();
        commentRoom.lastModifiedDate = commentRoom.createdDate;

        return commentRoom;
    }

    public void setDocument(String documentId) {
        this.documentId = documentId;
    }

    public void setPinNumber(String pinNumber) {
        this.pinNumber = pinNumber;
    }

    public void closeCommentRoom() {
        this.status = RoomStatus.CLOSED;
        this.lastModifiedDate = LocalDateTime.now();
    }

    public void fixRoomTitle(String roomTitle) {
        this.roomTitle = roomTitle;
        this.lastModifiedDate = LocalDateTime.now();
    }

    public void fixMemberLimit(int memberLimit) {
        this.memberLimit = memberLimit;
        this.lastModifiedDate = LocalDateTime.now();
    }
}
