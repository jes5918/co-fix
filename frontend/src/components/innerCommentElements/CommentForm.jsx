// Roll : Comment 컨테이너에서 comment를 작성하는 폼.

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { commentCreateAction } from '../../modules/actions/commentActions';
import { createComment } from '../../api/comments.js';

const localStorage = window.localStorage;

function CommentForm({
  sentenceId,
  onHandleClickSentence,
  onHandleScrollToBottom,
}) {
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
        onHandleScrollToBottom();
        setTimeout(() => {
          onHandleScrollToBottom();
        }, 1);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const onHandleSubmit = async (e) => {
    if (!sentenceId) {
      inputRef.current.value = '';
      return;
    }
    const content = inputRef.current.value.trim();
    if (!e.shiftKey && e.keyCode === 13 && content) {
      const nickname = localStorage.getItem('nickName') || 'anonymous';
      onHandleSubmitComment(sentenceId, nickname, content);
      inputRef.current.value = '';
      onHandleScrollToBottom();
    }
  };

  return (
    <S.CommentForm>
      <S.FormLabelBox>
        <S.FormLabel>문장에 대한 의견을 남겨주세요.</S.FormLabel>
      </S.FormLabelBox>
      <S.FormInputBox>
        <S.FormInput
          require
          ref={inputRef}
          onKeyUp={(e) => onHandleSubmit(e)}
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
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 2% 5%;
  `,
  FormLabelBox: styled.div`
    display: flex;
    align-items: center;
    padding-left: 2%;
    /* flex-basis: 20%; */
  `,
  FormLabel: styled.label.attrs({
    for: 'comment',
  })`
    padding-left: 2%;
    font-family: 'S-CoreDream-6Bold';
    font-size: 16px;
    color: #727272;
  `,
  FormInputBox: styled.div`
    /* flex-basis: 80%; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
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
    font-family: 'GongGothicLight';
    overflow: hidden;
    font-size: 14px;
  `,
};
