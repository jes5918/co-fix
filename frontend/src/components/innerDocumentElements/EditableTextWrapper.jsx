// Roll : Document 컨테이너에서 각 문장을 감싸는 UI

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  documentModifyAction,
  documentSelectAction,
} from '../../modules/actions/documentActions';
import styled from 'styled-components';
import Editabletext from './Editabletext';

// socket
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default function EditableTextWrapper({
  data,
  testRequest,
  onHandleClickSentence,
}) {
  const { modifiedContent } = data;
  console.log(data);
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
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
      sentenceId: data.sentenceId,
      modifiedContent: newValue,
    };
    dispatch(documentModifyAction(updateData));
    // backend 로 수정하는거 보내야 하는 자리 (츄츄가)
  };

  // const connectSocket = () => {
  //   stompClient.connect(
  //     {
  //       nickname: localStorage.getItem('nickname') || '기본 닉네임',
  //       commentRoomId: roomId,
  //     },
  //     (frame) => {
  //       stompClient.subscribe('/sentence/' + roomId, (res) => {
  //         const body = JSON.parse(res.body);
  //         const modifiedSentence = body.sentence; // 들어오는거 확인
  //         dispatch(documentModifyAction(modifiedSentence));
  //         console.log('소켓 수정 :', modifiedSentence);
  //         return body;
  //       });
  //     },
  //   );
  // };

  // useEffect(() => {}, []);

  return (
    <>
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
    </>
  );
}

const TextContainer = styled.div`
  position: relative;
  word-break: keep-all;
  font-size: 18px;
  font-weight: bold;
  font-family: 'SCD_medium';
  margin: 0px 0px 12px 0px;
  &:hover {
    background-color: #feffbc;
  }
`;
