import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import { modifyDocuments } from '../../api/documents';
import styled from 'styled-components';
import MyEditabletext from './MyEditabletext';
import { debounce } from 'lodash';

export default function MyEditableTextWrapper({
  sentence,
  isSelected,
  roomId,
  documentId,
  onHandleClickSentence,
}) {
  const { modifiedContent, sentenceId } = sentence;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const editorModeToggleHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const selectDocumentHandler = () => {
    onHandleClickSentence(sentence.sentenceId);
    dispatch(documentSelectAction(sentence.sentenceId));
  };

  const onHandleDebounce = debounce((modifiedSentence) => {
    dispatch(documentModifyAction(modifiedSentence));
  }, 500);

  const ModifyActionHandler = (modifiedSentence) => {
    onHandleDebounce(modifiedSentence);
  };

  const setNewValue = (newValue) => {
    let updateData = sentence;
    updateData.modifiedContent = newValue;
    ModifyActionHandler(updateData);
    modifyDocuments(
      roomId,
      documentId,
      sentenceId,
      {
        modifiedContent: newValue,
      },
      () => {},
      (error) => {
        console.error(error);
      },
    );
  };

  return (
    <>
      {!isEditMode ? (
        <TextContainer
          isSelected={isSelected}
          onDoubleClick={editorModeToggleHandler}
          onClick={selectDocumentHandler}
        >
          {modifiedContent}
        </TextContainer>
      ) : (
        <MyEditabletext
          editorModeToggleHandler={editorModeToggleHandler}
          setNewValue={setNewValue}
          content={modifiedContent}
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
  font-family: 'S-CoreDream-5Medium';
  margin: 15px 30px 0px 10px;
  border-radius: 10px;
  &:hover {
    background-color: #feffbc;
  }
  border: ${({ isSelected }) =>
    isSelected ? '2px solid #f1abab' : '2px solid transparent'};
`;
