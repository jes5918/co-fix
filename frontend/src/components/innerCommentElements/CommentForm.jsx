// Roll : Comment 컨테이너에서 comment를 작성하는 폼.

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

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
    font-family: 'Samlip';
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
    font-family: 'Samlip';
    overflow: hidden;
    font-size: 14px;
  `,
};

function CommentForm({ sentenceId, onSubmit }) {
  const inputRef = useRef(null);
  const localStorage = window.localStorage;

  const onHandleSubmit = (e) => {
    if (e.keyCode === 13) {
      const content = inputRef.current.value;
      const nickname = '임시 닉네임';
      inputRef.current.value = '';
      onSubmit(sentenceId, nickname, content);
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
        <S.FormInput ref={inputRef} onKeyUp={(e) => onHandleSubmit(e)} />
      </S.FormInputBox>
    </S.CommentForm>
  );
}

export default CommentForm;
