package com.ssafy.devfolio.sentence;

import com.ssafy.devfolio.exception.BaseException;
import com.ssafy.devfolio.exception.ErrorCode;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Feeling {
    private int count;
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
