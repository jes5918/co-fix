// Roll : Comment 컨테이너에서 Avatar, NickName, Comment를 하나로 묶어서 표현하는 UI

import React, { useState } from 'react';
import styled from 'styled-components';

// components
import UserAvatar from '../innerCommentElements/UserAvatar';
import UserComment from '../innerCommentElements/UserComment';
import UserNickName from '../innerCommentElements/UserNickName';

import useRoomInfo from '../../hook/useRoomInfo';
import useComment from '../../hook/useComment';
import useLoginUser from '../../hook/useLoginUser';
import { agreeComment } from '../../api/comments';

const S = {
  CommentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 95%;
    height: fit-content;
    padding: 2% 2%;
    margin-bottom: 5%;
  `,
  TopPart: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-basis: 30%;
    margin-bottom: 10px;
  `,
  BottomPart: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 65%;
    background-color: transparent;
    width: 100%;
    height: fit-content;
    word-wrap: break-word;
  `,
  AgreeButton: styled.button`
    outline: none;
    border: 2px solid #adadad;
    border-radius: 20px;
    text-align: center;
    padding: 2px 10px;
    color: ${({ isAgree }) => (isAgree ? 'white' : '#adadad')};
    background-color: ${({ isAgree }) => (!isAgree ? 'white' : '#adadad')};
    font-family: 'S-CoreDream-6Bold';
    font-size: 14px;
    font-weight: bold;
    justify-items: flex-end;
    cursor: pointer;
    margin-right: 10px;
  `,
  TopLeft: styled.div`
    display: flex;
    align-items: center;
  `,
  TopRight: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  AgreeMembersWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #adadad;
    width: 25px;
    height: 25px;
    border-radius: 50%;
  `,
  AgreeMembers: styled.span`
    font-family: 'S-CoreDream-6Bold';
    color: white;
    font-size: 16px;
  `,
};

const backgroundColors = [
  '#ffe6e6',
  '#fceede',
  '#fffbd5',
  '#e9ffe2',
  '#d9fcff',
  '#e2edff',
  '#eae7ff',
  '#ffeeff',
  '#fff2f2',
];

function CommentWrapper({ userId, comment, sentenceId }) {
  const { roomId, documentId, members } = useRoomInfo();
  const { commentId, nickname, agree } = comment;
  const userNickName = window.localStorage.getItem('nickName');
  // 방에 있는 멤버 중 코멘트 쓴 멤버랑 같으면 인덱스 반환 -> 인덱스에 맞는 색깔로 추출.
  const backgroundIndex =
    members &&
    members.length > 0 &&
    members.findIndex((member) => member.nickname === nickname);

  // agree한 사람 중, 현재 유저의 닉네임이 포함되어 있으면 true 반환.
  const isAgree = agree.members.includes(userNickName) ? true : false;

  const onHandleClick = () => {
    // Agree 요청.
    agreeComment(
      roomId,
      documentId,
      sentenceId,
      commentId,
      userNickName,
      () => {},
      () => {},
    );
  };
  return (
    <S.CommentWrapper>
      <S.TopPart>
        <S.TopLeft>
          <UserAvatar backgroundColor={backgroundColors[backgroundIndex]} />
          <UserNickName nickname={comment.nickname} />
        </S.TopLeft>
        <S.TopRight>
          <S.AgreeButton
            data-user-id={userId}
            onClick={() => onHandleClick()}
            isAgree={isAgree}
          >
            Agree
          </S.AgreeButton>
          <S.AgreeMembersWrapper>
            <S.AgreeMembers>{agree.count}</S.AgreeMembers>
          </S.AgreeMembersWrapper>
        </S.TopRight>
      </S.TopPart>
      <S.BottomPart>
        <UserComment
          comment={comment.content}
          backgroundColor={backgroundColors[backgroundIndex]}
        />
      </S.BottomPart>
    </S.CommentWrapper>
  );
}

export default CommentWrapper;
