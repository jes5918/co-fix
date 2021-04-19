package com.ssafy.devfolio.Member.dto;

import com.ssafy.devfolio.Member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private Long id;
    private String email;
    private String name;
    private String img;

    public Member toMember() {
        return Member.builder()
                .email(this.email)
                .name(this.name)
                .img(this.img)
                .build();
    }
}
