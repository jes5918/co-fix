// Roll : Comment 컨테이너에서 컬러 or 이미지 아바타 UI

import React from 'react';
import styled from 'styled-components';

const S = {
  UserAvatarWrapper: styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  `,
  UserAvatar: styled.span`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #d3f8da;
  `,
};

function UserAvatar() {
  return (
    <S.UserAvatarWrapper>
      <S.UserAvatar />
    </S.UserAvatarWrapper>
  );
}

export default UserAvatar;
