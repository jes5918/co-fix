package com.ssafy.devfolio.commentroom;

import com.ssafy.devfolio.commentroom.dto.CreateCommentRoomRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
public class CommentRoom implements Serializable {

    private String roomId;
    private Long memberId;
    private String roomTitle;
    private int memberLimit;
    private String documentId;
    private String pinNumber;
    private RoomStatus status;
    private LocalDateTime createdDate;
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
}
