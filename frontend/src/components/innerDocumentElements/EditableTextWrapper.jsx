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
  const socket = new SockJS('https://k4b104.p.ssafy.io/api/wss');
  const stompClient = Stomp.over(socket);

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
    dispatch(documentModifyAction(updateData));
    // backend 로 수정하는거 보내야 하는 자리 (츄츄가)
  };

  const connectSocket = () => {
    stompClient.connect(
      {
        nickname: localStorage.getItem('nickname') || 'defaultNickName',
        commentRoomId: roomId,
      },
      (frame) => {
        console.log('연결됨');
        console.log(sentenceId);
        stompClient.subscribe('/sentence/' + sentenceId, (res) => {
          const body = JSON.parse(res.body);
          console.log('소켓 연결 : ', body);
          dispatch(commentCreateAction(body));
          return body;
        });
      },
    );
  };

  const disconnectSocket = () => {
    stompClient.disconnect(() => {
      console.log('sentence scoket disconnected');
    });
  };

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <>
      {!isEditMode ? (
        <TextContainer
          onDoubleClick={editorModeToggleHandler}
          onClick={() => {
            selectDocumentHandler();
            onHandleClickSentence(data.sentenceId);
            // connectSocket();
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
    </>
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
