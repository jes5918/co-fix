package com.ssafy.devfolio.commentroom;

import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCommentRoomRequest {
    private String roomTitle;
    private int memberLimit;
    private String contents;
}
