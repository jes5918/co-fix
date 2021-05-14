package com.ssafy.devfolio.commentroom;

import com.ssafy.devfolio.commentroom.dto.CreateCommentRoomRequest;
import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import com.ssafy.devfolio.member.dto.JoinMember;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
    @ApiModelProperty(value = "첨삭방 참여 인원 목록")
    private List<JoinMember> members;
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
        commentRoom.members = new ArrayList<>();
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

    /**
     * 첨삭방 참가
     * 새로운 유저면 return 1
     * 기존 유저면 return 0
     * @param nickname
     * @return int
     */
    public int enterCommentRoom(String nickname) {
        // 현재 참가자 인원이 최대인 경우 예외처리
        long onlineMemberCount = this.members.stream()
                .filter(member -> member.isOnline())
                .count();
        if (onlineMemberCount >= this.memberLimit) {
            throw new BaseException(ErrorCode.COMMENT_ROOM_FULL_EXCEPTION);
        }

        // 이미 참가했었던 유저라면 online 상태로 변경
        for (JoinMember member : this.members) {
            if (nickname.equals(member.getNickname())) {
                member.enter();
                return 0;
            }
        }
        // 신규 유저면 첨삭방에 추가
        this.members.add(JoinMember.newMember(nickname));
        return 1;
    }

    public void exitCommentRoom(String nickname) {
        this.members.stream()
                .filter(member -> nickname.equals(member.getNickname())).findFirst()
                .ifPresent(JoinMember::exit);
    }
}
