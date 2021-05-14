// Roll : 편집 화면에서 우측 Comment 작성 및 보이는 부분의 상태를 관리함.

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import CommentForm from '../components/innerCommentElements/CommentForm';
import CommentWrapper from '../components/innerCommentElements/CommentWrapper';

const S = {
  CommentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100%;
    padding: 20px 10px;
  `,
};

export default function CommentContainer({
  comments,
  sentenceId,
  onHandleSubmitComment,
  onHandleClickAgree,
}) {
  const onHandleSubmit = () => {
    // 1. 이벤트 props로 내려주고,
    // 2. CommentForm에서 onSubmit 이벤트에 대한 콜백함수로 실행
    // 3. 소켓 통신해서 UI 렌더링하는 데이터에 추가, 백에 API 요청 보냄.(동시)
  };

  return (
    <S.CommentContainer>
      {comments &&
        comments.map((item) => {
          return (
            <CommentWrapper
              key={item.id}
              userId={item.id}
              avatar={item.avatar}
              comment={item.comment}
              nickName={item.nickName}
            />
          );
        })}
      <CommentForm onSubmit={onHandleSubmitComment} sentenceId={sentenceId} />
    </S.CommentContainer>
  );
}
