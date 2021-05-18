// Roll : 편집 화면에서 우측 Comment 작성 및 보이는 부분의 상태를 관리함.

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { closeRoom } from '../api/co-fix';

import CommentWrapper from '../components/innerCommentElements/CommentWrapper';

import useCommentData from '../hook/useComment.js';

const S = {
  CommentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90%;
    padding: 20px 10px;
  `,
  CommentNotExistInfoWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  CommentNotExistInfo: styled.span`
    font-family: 'S-CoreDream-5Medium';
    font-size: 1.3rem;
    color: #838383;
  `,
};

export default function CommentContainer({ sentenceId }) {
  const comments = useCommentData();
  return (
    <S.CommentContainer>
      {!sentenceId && (
        <S.CommentNotExistInfoWrapper>
          <S.CommentNotExistInfo>문장을 선택해주세요.</S.CommentNotExistInfo>
        </S.CommentNotExistInfoWrapper>
      )}
      {comments.length < 1 && (
        <S.CommentNotExistInfoWrapper>
          <S.CommentNotExistInfo>
            현재 선택된 문장에 대한 코멘트가 없습니다.
          </S.CommentNotExistInfo>
        </S.CommentNotExistInfoWrapper>
      )}
      {sentenceId &&
        comments &&
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
    </S.CommentContainer>
  );
}
