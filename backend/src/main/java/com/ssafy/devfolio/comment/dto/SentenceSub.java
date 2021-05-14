package com.ssafy.devfolio.comment.dto;

import com.ssafy.devfolio.comment.Agree;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SentenceSub {

    private String sentenceId;
    private String commentId;
    private String nickname;
    private String content;
    private Agree agree;
    private LocalDateTime lastModifiedDate;

}
