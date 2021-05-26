// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import {
  commentCreateAction,
  commentAgreeAction,
} from '../../modules/actions/commentActions';
import { setSubscription } from '../../modules/actions/roomActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';
import useRoomInfo from '../../hook/useRoomInfo';
import useLoginUser from '../../hook/useLoginUser';
import useDocument from '../../hook/useDocument';

// library
import { debounce } from 'lodash';

// image
import commentImage from '../../assets/comment.png';

export default function EditableTextWrapper({
  data,
  testRequest,
  stompClientTest,
  onHandleClickSentence,
  subscription,
  setSubscription,
  isSelected,
}) {
  const { modifiedContent, sentenceId, hasComment } = data;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const { memberId } = useRoomInfo();
  const { credentials } = useLoginUser();
  const { selectNum } = useDocument();

  const editorModeToggleHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const selectDocumentHandler = () => {
    dispatch(documentSelectAction(sentenceId));
  };

  const setNewValue = (newValue) => {
    const updateData = {
      ...data,
      sentenceId: sentenceId,
      modifiedContent: newValue,
    };
    ModifyActionHandler(updateData);
  };

  const onHandleClick = () => {
    if (selectNum !== sentenceId) {
      if (subscription) {
        subscription.unsubscribe();
      }
      const getSubscription = subscribe(sentenceId);
      setSubscription(getSubscription);
    }
  };

  const onHandleDebounce = debounce((modifiedSentence) => {
    dispatch(documentModifyAction(modifiedSentence));
  }, 500);

  const ModifyActionHandler = (modifiedSentence) => {
    onHandleDebounce(modifiedSentence);
  };

  const subscribe = (getSentenceId) => {
    const subscription = stompClientTest.subscribe(
      '/sentence/' + getSentenceId,
      (res) => {
        const body = JSON.parse(res.body);
        const isAgree = body.isAgree === 'false' ? false : true;
        if (!isAgree) {
          dispatch(commentCreateAction(body));
        } else {
          dispatch(commentAgreeAction(body));
        }
        return body;
      },
    );
    return subscription;
  };

  return (
    <S.SentenceWrapper onClick={() => onHandleClick()}>
      <S.ShowIsCommentInfo>
        {hasComment && <S.CommentImage />}
      </S.ShowIsCommentInfo>
      {!isEditMode ? (
        <S.TextContainer
          isSelected={isSelected}
          onDoubleClick={() => {
            if (credentials.member && memberId === credentials.member.id) {
              editorModeToggleHandler();
            }
          }}
          onClick={() => {
            selectDocumentHandler();
            onHandleClickSentence(data.sentenceId);
          }}
        >
          {modifiedContent}
        </S.TextContainer>
      ) : (
        <Editabletext
          editorModeToggleHandler={editorModeToggleHandler}
          setNewValue={setNewValue}
          content={modifiedContent}
          testRequest={testRequest}
          sentenceId={data.sentenceId}
        />
      )}
    </S.SentenceWrapper>
  );
}

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
  CommentCount: styled.div`
    position: absolute;
    color: white;
    font-size: 0.8rem;
  `,
  TextContainer: styled.div`
    position: relative;
    cursor: pointer;
    word-break: keep-all;
    font-size: 18px;
    font-weight: bold;
    font-family: 'S-CoreDream-5Medium';
    margin: 0px 24px 12px 0px;
    border-radius: 10px;
    &:hover {
      background-color: #feffbc;
    }
    padding: 2px 4px;
    border: ${({ isSelected }) =>
      isSelected ? '2px solid #f1abab' : '2px solid transparent'};
  `,
  AgreeMembers: styled.span`
    font-family: 'S-CoreDream-6Bold';
    color: white;
    font-size: 16px;
  `,
};
