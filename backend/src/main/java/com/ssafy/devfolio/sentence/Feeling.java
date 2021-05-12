package com.ssafy.devfolio.sentence;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "감정표현 정보")
public class Feeling {
    @ApiModelProperty(value = "감정표현한 사람 수")
    private int count;
    @ApiModelProperty(value = "감정표현한 사람 닉네임")
    private List<String> members;

    public static Feeling create() {
        Feeling feeling = new Feeling();

        feeling.count = 0;
        feeling.members = new ArrayList<>();

        return feeling;
    }

    public void pressFeeling(String nickname) {
        this.count += 1;
        this.members.add(nickname);
    }

    public void cancelFeeling(String nickname) {
        if (this.count <= 0) {
            throw new BaseException(ErrorCode.FEELING_CANCEL_FAIL_EXCEPTION);
        }

        if (!this.members.contains(nickname)) {
            throw new BaseException(ErrorCode.FEELING_MEMBER_NOT_EXIST);
        }

        this.members.remove(nickname);
    }
}
