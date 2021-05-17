// Roll : 편집 화면에서 우측 Comment 작성 및 보이는 부분의 상태를 관리함.

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { closeRoom } from '../api/co-fix';

import CommentForm from '../components/innerCommentElements/CommentForm';
import CommentWrapper from '../components/innerCommentElements/CommentWrapper';

import useCommentData from '../hook/useComment.js';

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
  sentenceId,
  onHandleClickSentence,
}) {
  const comments = useCommentData();
  return (
    <S.CommentContainer>
      {comments &&
        comments[0] !== null &&
        comments.map((item, idx) => {
          return (
            <CommentWrapper
              key={idx * 123413}
              comment={item}
              sentenceId={sentenceId}
            />
          );
        })}
      <CommentForm
        sentenceId={sentenceId}
        onHandleClickSentence={onHandleClickSentence}
      />
    </S.CommentContainer>
  );
}
