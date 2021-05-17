// Roll : Comment 컨테이너에서 comment를 작성하는 폼.

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { commentCreateAction } from '../../modules/actions/commentActions';
import { createComment } from '../../api/comments.js';

const localStorage = window.localStorage;

function CommentForm({ sentenceId, onHandleClickSentence }) {
  const inputRef = useRef(null);
  const { roomId, documentId } = useSelector((state) => {
    return state.room;
  });

  // comment 생성
  const onHandleSubmitComment = (sentenceId, nickname, content) => {
    createComment(
      roomId,
      documentId,
      sentenceId,
      {
        content,
        nickname,
      },
      (res) => {
        // console.log('POST: Comment :', res.data.data);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const onHandleSubmit = (e) => {
    if (e.keyCode === 13) {
      const content = inputRef.current.value;
      const nickname = localStorage.getItem('nickname') || 'anonymous';
      onHandleSubmitComment(sentenceId, nickname, content);
      inputRef.current.value = '';
    }
  };

  return (
    <S.CommentForm>
      <S.FormLabelBox>
        {/* 새로운 아이콘을 주시오. */}
        <span style={{ color: '#aaaaaa' }}>🗨</span>
        <S.FormLabel>Comment</S.FormLabel>
      </S.FormLabelBox>
      <S.FormInputBox>
        <S.FormInput
          require
          ref={inputRef}
          onKeyDown={(e) => onHandleSubmit(e)}
        />
      </S.FormInputBox>
    </S.CommentForm>
  );
}

export default CommentForm;

const S = {
  CommentForm: styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 130px;
    padding: 0 20px;
  `,
  FormLabelBox: styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    flex-basis: 20%;
  `,
  FormLabel: styled.label.attrs({
    for: 'comment',
  })`
    padding-left: 10px;
    font-family: 'S-CoreDream-6Bold';
    font-size: 16px;
    color: #727272;
  `,
  FormInputBox: styled.div`
    flex-basis: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  FormInput: styled.textarea.attrs({
    type: 'text',
    id: 'comment',
  })`
    padding: 12px 10px;
    resize: none;
    border: 3px solid #aaaaaa;
    border-radius: 10px;
    outline: none;
    width: 100%;
    height: 80%;
    font-family: 'S-CoreDream-5Medium';
    overflow: hidden;
    font-size: 14px;
  `,
};
