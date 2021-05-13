package com.ssafy.devfolio.comment;

import com.ssafy.devfolio.comment.dto.CommentRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@ApiModel(value = "첨삭 코멘트")
public class Comment {
    @ApiModelProperty(value = "코멘트 id")
    private String commentId;
    @ApiModelProperty(value = "코멘트 작성자 닉네임")
    private String nickname;
    @ApiModelProperty(value = "코멘트 내용")
    private String content;
    @ApiModelProperty(value = "코멘트 Agree 관련 데이터")
    private Agree agree;
    @ApiModelProperty(value = "코멘트 생성 날짜")
    private LocalDateTime createdDate;
    @ApiModelProperty(value = "코멘트 최근 수정 날짜")
    private LocalDateTime lastModifiedDate;

    public static Comment createComment(CommentRequest request) {
        Comment comment = new Comment();

        comment.commentId = UUID.randomUUID().toString();
        comment.nickname = request.getNickname();
        comment.content = request.getContent();
        comment.agree = Agree.create();
        comment.createdDate = LocalDateTime.now();
        comment.lastModifiedDate = comment.createdDate;

        return comment;
    }

    public void pressAgree(String nickname) {
        if (this.agree.getMembers().contains(nickname)) {
            this.agree.disagree(nickname);
        } else {
            this.agree.agree(nickname);
        }
    }
}
