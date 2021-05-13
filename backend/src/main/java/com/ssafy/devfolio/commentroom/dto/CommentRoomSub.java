package com.ssafy.devfolio.commentroom.dto;

import com.ssafy.devfolio.commentroom.RoomStatus;
import com.ssafy.devfolio.member.dto.JoinMember;
import com.ssafy.devfolio.sentence.Sentence;
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
public class CommentRoomSub {

    private String roomId;
    private String roomTitle;

    private int memberLimit;
    
    private Sentence sentence;

    private RoomStatus status;
    private List<JoinMember> members;

    private LocalDateTime lastModifiedDate;

}
