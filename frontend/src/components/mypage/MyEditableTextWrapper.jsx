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
// image
import commentImage from '../../assets/comment.png';

export default function MyEditableTextWrapper({
  sentence,
  isSelected,
  roomId,
  documentId,
  onHandleClickSentence,
  setIsChanged,
}) {
  const { modifiedContent, sentenceId, hasComment } = sentence;
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
      (res) => {
        setIsChanged((prev) => !prev);
      },
      () => {},
    );
  };

  return (
    <S.SentenceWrapper>
      <S.ShowIsCommentInfo>
        {hasComment && <S.CommentImage />}
      </S.ShowIsCommentInfo>
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
    </S.SentenceWrapper>
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

const S = {
  SentenceWrapper: styled.div`
    position: relative;
    margin-right: 10px;
  `,
  ShowIsCommentInfo: styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    width: 25px;
    height: 25px;
    transform: translate(0, -50%);
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  CommentImage: styled.img.attrs({
    src: `${commentImage}`,
  })`
    width: 20px;
    height: 20px;
  `,
};
