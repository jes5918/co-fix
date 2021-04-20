package com.ssafy.devfolio.Member;

import lombok.Getter;

@Getter
public enum RoleType {
    ROLE_USER("ROLE_USER"), ROLE_ADMIN("ROLE_ADMIN");

    private String role;

    RoleType(String role) {
        this.role = role;
    }
}
