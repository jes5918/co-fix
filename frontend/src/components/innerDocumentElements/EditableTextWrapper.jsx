// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import { commentCreateAction } from '../../modules/actions/commentActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';
import useRoomInfo from '../../hook/useRoomInfo';

// library
import { debounce } from 'lodash';

// socket
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default function EditableTextWrapper({
  data,
  testRequest,
  onHandleClickSentence,
}) {
  const { modifiedContent, sentenceId } = data;
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const { roomId, documentId } = useRoomInfo();

  // socket

  const editorModeToggleHandler = () => {
    setIsEditMode(!isEditMode);
  };

  const selectDocumentHandler = () => {
    dispatch(documentSelectAction(data.id));
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

  const connectSocket = () => {
    const socket = new SockJS('https://k4b104.p.ssafy.io/api/wss');
    const stompClient = Stomp.over(socket);
    console.log('소켓 연결');
    stompClient.connect(
      {
        nickname: localStorage.getItem('nickname') || 'defaultNickName',
        commentRoomId: roomId,
      },
      (frame) => {
        stompClient.subscribe('/sentence/' + sentenceId, (res) => {
          const body = JSON.parse(res.body);
          console.log('소켓 연결 : ', body);
          console.log('isAgree :', body.isAgree);
          if (!body.isAgree) {
            dispatch(commentCreateAction(body));
          }
          // return body;
        });
      },
    );
  };

  const disconnectSocket = () => {
    const socket = new SockJS('https://k4b104.p.ssafy.io/api/wss');
    const stompClient = Stomp.over(socket);
    console.log('소켓 연결 해제');

    stompClient.disconnect(() => {
      console.log('sentence scoket disconnected');
    });
  };

  useEffect(() => {
    // return () => {
    //   disconnectSocket();
    // };
  }, []);

  return (
    <div
      onClick={() => {
        connectSocket();
      }}
      // div에서 한다.
      // onBlur={() => {
      //   console.log('실행');
      //   disconnectSocket();
      // }}
    >
      {!isEditMode ? (
        <TextContainer
          onDoubleClick={editorModeToggleHandler}
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
