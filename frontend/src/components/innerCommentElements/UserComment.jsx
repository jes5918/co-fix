// Roll : Comment 화면에서 유저의 comment content를 보여주는 UI

import React from 'react';
import styled from 'styled-components';

const S = {
  CommentWrapper: styled.div`
    width: 90%;
    height: 70%;
    background-color: #d3f8da;
    padding: 10px 10px;
    border-radius: 10px;
    font-family: 'Samlip';
    font-size: 16px;
    color: #414141;
  `,
};

function UserComment({ comment }) {
  return <S.CommentWrapper>{comment}</S.CommentWrapper>;
}

export default UserComment;
