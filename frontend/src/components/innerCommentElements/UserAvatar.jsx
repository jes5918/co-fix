// Roll : Comment 컨테이너에서 컬러 or 이미지 아바타 UI

import React from 'react';
import styled from 'styled-components';

const S = {
  UserAvatarWrapper: styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  `,
  UserAvatar: styled.span`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #d3f8da;
  `,
};

function UserAvatar({ avatar }) {
  return (
    <S.UserAvatarWrapper>
      <S.UserAvatar avatar={avatar} />
    </S.UserAvatarWrapper>
  );
}

export default UserAvatar;
