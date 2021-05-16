// Roll : Comment 컨테이너에서 유저 닉네임 UI

import React from 'react';
import styled from 'styled-components';

const S = {
  UserNickName: styled.span`
    font-weight: bold;
    font-size: 14px;
    font-family: 'SCD_bold';
  `,
};

function UserNickName({ nickname }) {
  return <S.UserNickName>{nickname}</S.UserNickName>;
}

export default UserNickName;
