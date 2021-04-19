package com.ssafy.devfolio.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "member_email")
    private String email;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_img")
    private String img;

    public Member updateInfo(String name, String img) {
        this.name = name;
        this.img = img;
        return this;
    }

}
