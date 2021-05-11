// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';

export default function EditableTextWrapper({ data }) {
  const { content } = data;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const editorModeToggleHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const selectDocumentHandler = () => {
    dispatch(documentSelectAction(data.id));
  };

  const setNewValue = (newValue) => {
    const updateData = {
      id: data.id,
      content: newValue,
      comments: data.comments,
    };
    dispatch(documentModifyAction(updateData));
  };

  return (
    <>
      {!isEditMode ? (
        <TextContainer
          onDoubleClick={editorModeToggleHandler}
          onClick={selectDocumentHandler}
        >
          {content}
        </TextContainer>
      ) : (
        <Editabletext
          editorModeToggleHandler={editorModeToggleHandler}
          setNewValue={setNewValue}
          content={content}
        />
      )}
    </>
  );
}

const TextContainer = styled.div`
  position: relative;
  word-break: keep-all;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Samlip';
  margin: 0px 0px 12px 0px;
  &:hover {
    background-color: #feffbc;
  }
`;
