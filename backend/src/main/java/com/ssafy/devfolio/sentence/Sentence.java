package com.ssafy.devfolio.sentence;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
@ApiModel(value = "문장")
public class Sentence {

    @ApiModelProperty(value = "문장 id")
    private String sentenceId;
    @ApiModelProperty(value = "원문 내용")
    private String originalContent;
    @ApiModelProperty(value = "수정된 내용")
    private String modifiedContent;
    @ApiModelProperty(value = "감정표현 관련 정보(긍정)")
    private Feeling positive;
    @ApiModelProperty(value = "감정표현 관련 정보(부정)")
    private Feeling negative;
    @ApiModelProperty(value = "코멘트 유무")
    private boolean hasComment;
    @ApiModelProperty(value = "문장 생성 날짜")
    private LocalDateTime createdDate;
    @ApiModelProperty(value = "최근 수정 날짜")
    private LocalDateTime lastModifiedDate;

    public static Sentence createSentence(String originalContent) {
        Sentence sentence = new Sentence();

        sentence.sentenceId = UUID.randomUUID().toString();
        sentence.originalContent = originalContent;
        sentence.modifiedContent = "";
        sentence.positive = Feeling.create();
        sentence.negative = Feeling.create();
        sentence.hasComment = false;
        sentence.createdDate = LocalDateTime.now();
        sentence.lastModifiedDate = sentence.createdDate;

        return sentence;
    }

    public void fix(String modifiedContent) {
        this.modifiedContent = modifiedContent;
        this.lastModifiedDate = LocalDateTime.now();
    }
}
