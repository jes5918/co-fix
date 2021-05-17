// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import { commentCreateAction } from '../../modules/actions/commentActions';
import { setSubscription } from '../../modules/actions/roomActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';
import useRoomInfo from '../../hook/useRoomInfo';
import useLoginUser from '../../hook/useLoginUser';
import useDocument from '../../hook/useDocument';

// library
import { debounce } from 'lodash';

export default function EditableTextWrapper({
  data,
  testRequest,
  stompClientTest,
  onHandleClickSentence,
  subscription,
  setSubscription,
}) {
  const { modifiedContent, sentenceId } = data;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const { roomId, documentId, memberId } = useRoomInfo();
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
    // backend 로 수정하는거 보내야 하는 자리 (츄츄가)
  };

  const onHandleDebounce = debounce((modifiedSentence) => {
    dispatch(documentModifyAction(modifiedSentence));
  }, 500);

  const ModifyActionHandler = (modifiedSentence) => {
    onHandleDebounce(modifiedSentence);
  };

  const subscribe = (getSentenceId) => {
    // const socket = new SockJS('https://k4b104.p.ssafy.io/api/wss');
    // const stompClient = Stomp.over(socket);
    const subscription = stompClientTest.subscribe(
      '/sentence/' + getSentenceId,
      (res) => {
        const body = JSON.parse(res.body);
        const isAgree = body.isAgree === 'false' ? false : true;
        console.log('소켓 연결 : ', body);
        console.log(isAgree);
        if (!isAgree) {
          dispatch(commentCreateAction(body));
        }
        return body;
      },
    );
    return subscription;
  };

  useEffect(() => {
    // return () => {
    //   disconnectSocket();
    // };
  }, []);

  return (
    <div
      onClick={() => {
        console.log('clicked');
        if (selectNum !== sentenceId) {
          if (subscription) {
            subscription.unsubscribe();
          }
          const getSubscription = subscribe(sentenceId);
          setSubscription(getSubscription);
        }
      }}
      // div에서 한다.
      // onBlur={() => {
      //   console.log('실행');
      //   disconnectSocket();
      // }}
    >
      {!isEditMode ? (
        <TextContainer
          onDoubleClick={() => {
            if (memberId === credentials.member.id) {
              editorModeToggleHandler();
            }
          }}
          onClick={() => {
            selectDocumentHandler();
            onHandleClickSentence(data.sentenceId);
          }}
        >
          {modifiedContent}
        </TextContainer>
      ) : (
        <Editabletext
          editorModeToggleHandler={editorModeToggleHandler}
          setNewValue={setNewValue}
          content={modifiedContent}
          testRequest={testRequest}
          sentenceId={data.sentenceId}
        />
      )}
    </div>
  );
}

const TextContainer = styled.div`
  position: relative;
  word-break: keep-all;
  font-size: 18px;
  font-weight: bold;
  font-family: 'S-CoreDream-5Medium';
  margin: 0px 0px 12px 0px;
  &:hover {
    background-color: #feffbc;
  }
`;
