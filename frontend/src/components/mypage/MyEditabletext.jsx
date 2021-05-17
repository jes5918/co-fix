// Roll : Document 컨테이너에서 수정 가능한 Input 객체

import React, { useEffect, useState, useRef } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

export default function MyEditabletext({
  content,
  setNewValue,
  editorModeToggleHandler,
}) {
  const textRef = useRef();

  const onHandleDebounce = debounce((e) => {
    setNewValue(e);
  }, 200);

  const changeh1Value = (e) => {
    onHandleDebounce(e.target.value);
  };

  useEffect(() => {
    textRef.current.style.height = '30px';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, []);

  return (
    <StyleH1Input
      ref={textRef}
      defaultValue={content}
      onChange={changeh1Value}
      autoFocus={true}
      onDoubleClick={editorModeToggleHandler}
      onBlur={editorModeToggleHandler}
    />
  );
}

const StyleH1Input = styled.textarea`
  width: 98%;
  min-height: 30px;
  resize: none;
  overflow: hidden;
  margin: 15px 30px 0px 10px;
  padding: 3px;
  font-size: 14px;
  word-break: keep-all;
  outline: none !important;
  border: none !important;
  font-size: 18px;
  font-weight: bold;
  font-family: 'S-CoreDream-5Medium';
  box-shadow: 2px 2px 4px 2px #c8c1c4;
`;
