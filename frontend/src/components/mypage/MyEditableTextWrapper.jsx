import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import { modifyDocuments } from '../../api/documents';
import styled from 'styled-components';
import MyEditabletext from './MyEditabletext';

export default function MyEditableTextWrapper({
  sentence,
  roomId,
  documentId,
}) {
  const { modifiedContent, sentenceId } = sentence;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const editorModeToggleHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const selectDocumentHandler = () => {
    dispatch(documentSelectAction(sentence.id));
  };

  const setNewValue = (newValue) => {
    let updateData = sentence;
    updateData.modifiedContent = newValue;
    dispatch(documentModifyAction(updateData));
    modifyDocuments(
      roomId,
      documentId,
      sentenceId,
      {
        modifiedContent: newValue,
      },
      (res) => {
        console.log('반환되는 값입니다. : ', res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <>
      {!isEditMode ? (
        <TextContainer
          onDoubleClick={editorModeToggleHandler}
          onClick={() => selectDocumentHandler}
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
  font-family: 'SCD_medium';
  margin: 15px 30px 0px 10px;
  &:hover {
    background-color: #ffffdf;
  }
`;
