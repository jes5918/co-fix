// Roll : Comment 화면에서 유저의 comment content를 보여주는 UI

import React from 'react';
import styled from 'styled-components';

const S = {
  CommentWrapper: styled.span`
    width: 100%;
    height: fit-content;
    padding: 10px 10px;
    border-radius: 10px;
    font-family: 'S-CoreDream-5Medium';
    font-size: 16px;
    color: #414141;
    background-color: ${({ backgroundColor }) => backgroundColor};
  `,
};

function UserComment({ comment, backgroundColor }) {
  return (
    <S.CommentWrapper backgroundColor={backgroundColor}>
      {comment}
    </S.CommentWrapper>
  );
}

export default UserComment;
