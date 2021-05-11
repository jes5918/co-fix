package com.ssafy.devfolio.sentence;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@NoArgsConstructor
public class Sentence {
    private String sentenceId;
    private String originalContent;
    private String modifiedContent;
    private Feeling positive;
    private Feeling negative;
    private boolean hasComment;
    private LocalDateTime createdDate;
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
