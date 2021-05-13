package com.ssafy.devfolio.comment;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "코멘트 Agree 관련 데이터")
public class Agree {
    @ApiModelProperty(value = "동의한 사람 수")
    private int count;
    @ApiModelProperty(value = "동의한 사람 닉네임 목록")
    private List<String> members;

    public static Agree create() {
        Agree agree = new Agree();

        agree.count = 0;
        agree.members = new ArrayList<>();

        return agree;
    }

    public void agree(String nickname) {
        this.count += 1;
        this.members.add(nickname);
    }

    public void disagree(String nickname) {
        if (this.count <= 0) {
            throw new BaseException(ErrorCode.COMMENT_DISAGREE_FAIL_EXCEPTION);
        }
        this.count -= 1;
        this.members.remove(nickname);
    }
}
