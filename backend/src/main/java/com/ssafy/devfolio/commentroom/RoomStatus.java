package com.ssafy.devfolio.commentroom;

public enum RoomStatus {
    OPEN("OPEN"), CLOSED("CLOSED");

    String status;

    RoomStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }
}
