package com.ssafy.devfolio.commentroom.dto;

public enum UpdatedType {
    ROOM("ROOM"), SENTENCE("SENTENCE");

    String type;

    UpdatedType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }
}
