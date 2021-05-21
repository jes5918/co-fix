package com.ssafy.devfolio.sentence.dto;


public enum FeelingType {
    POSITIVE("POSITIVE"), NEGATIVE("NEGATIVE");

    String type;

    FeelingType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }
}
