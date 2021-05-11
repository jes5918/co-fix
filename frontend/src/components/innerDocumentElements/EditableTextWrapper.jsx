// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';
import { GoThumbsup } from 'react-icons/go';
import { GoThumbsdown } from 'react-icons/go';

const PositiveButton = () => {
  return <StyledThumbsUp />;
};

const NegativeButton = () => {
  return <StyledThumbsDown />;
};

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
  margin: 15px 30px 0px 10px;
  &:hover {
    background-color: #feffbc;
  }
`;

const UpDownIconWrapper = styled.span`
  position: absolute;
  display: inline-block;
`;

const StyledThumbsUp = styled(GoThumbsup)`
  margin: 0px 0px 0px 10px;
`;
const StyledThumbsDown = styled(GoThumbsdown)`
  margin: 0px 0px 0px 10px;
`;
