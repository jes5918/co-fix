// Roll : Comment 컨테이너에서 Avatar, NickName, Comment를 하나로 묶어서 표현하는 UI

import React from 'react';
import styled from 'styled-components';

// components
import UserAvatar from '../innerCommentElements/UserAvatar';
import UserComment from '../innerCommentElements/UserComment';
import UserNickName from '../innerCommentElements/UserNickName';

const S = {
  CommentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 150px;
  `,
  TopPart: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 30%;
    padding: 0 20px;
  `,
  BottomPart: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 70%;
    background-color: white;
    height: fit-content;
  `,
  AgreeButton: styled.button`
    outline: none;
    border: 3px solid #56f356;
    border-radius: 20px;
    text-align: center;
    padding: 4px 20px;
    color: #56f356;
    font-family: 'Samlip';
    font-size: 14px;
    font-weight: bold;
    justify-items: flex-end;
    cursor: pointer;
  `,
  TopLeft: styled.div`
    display: flex;
    align-items: center;
  `,
};

function CommentWrapper({ avatar, comment, nickname }) {
  return (
    <S.CommentWrapper>
      <S.TopPart>
        <S.TopLeft>
          <UserAvatar avatar={avatar} />
          <UserNickName nickname={nickname} />
        </S.TopLeft>
        <S.AgreeButton>동의</S.AgreeButton>
      </S.TopPart>
      <S.BottomPart>
        <UserComment comment={comment} />
      </S.BottomPart>
    </S.CommentWrapper>
  );
}

export default CommentWrapper;
