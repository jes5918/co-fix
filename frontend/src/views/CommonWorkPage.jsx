import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveRoomInfo, resetRoomInfo } from '../modules/actions/roomActions';
import { commentSetAction } from '../modules/actions/commentActions';
import { getRoomInfo, closeRoom } from '../api/co-fix';
import { modifyDocuments } from '../api/documents';
import { getDocuments } from '../api/documents';
import {
  documentGetAction,
  documentModifyAction,
} from '../modules/actions/documentActions';
import { getAllComments, agreeComment } from '../api/comments.js';

// socket
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

// library
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { debounce } from 'lodash';

// containers
import Participant from '../containers/mypage/Participant';
import DocumentContainer from '../containers/DocumentContainer';
import CommentContainer from '../containers/CommentContainer';
import RoomSettingButtonContainer from '../containers/RoomSettingButtonContainer';

// components
import OpenViduMain from '../openvidu/OpenViduMain';
import useRoomInfo from '../hook/useRoomInfo';
import useLoginUser from '../hook/useLoginUser';

const localStorage = window.localStorage;

export default function CommonWorkPage() {
  const dispatch = useDispatch();
  const { roomId, documentId, memberId, roomTitle } = useRoomInfo();
  const [stompClientTest, setStompClientTest] = useState();
  const sentences = useSelector((state) => {
    return state.document.data;
  });

  const [onFocusedSentence, setOnFocusedSentence] = useState('');

  // socket

  // sentence 클릭 -> comment 조회
  const onHandleClickSentence = (sentenceId) => {
    setOnFocusedSentence(sentenceId);
    getAllComments(
      roomId,
      documentId,
      sentenceId,
      (res) => {
        dispatch(commentSetAction(res.data.data));
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // socket 테스트
  const testRequest = (sentenceId, modifiedContent) => {
    modifyDocuments(
      roomId,
      documentId,
      sentenceId,
      {
        modifiedContent: modifiedContent,
      },
      (res) => {
        // console.log('반환되는 값입니다. : ', res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const connectSocket = () => {
    const socket = new SockJS('https://k4b104.p.ssafy.io/api/wss');
    const stompClient = Stomp.over(socket);
    setStompClientTest(stompClient);
    stompClient.connect(
      {
        nickname: localStorage.getItem('nickName') || 'defaultNickName',
        commentRoomId: roomId,
      },
      (frame) => {
        console.log('room connected : ', roomId);
        stompClient.subscribe('/room/' + roomId, (res) => {
          const body = JSON.parse(res.body);
          const modifiedSentence = body.sentence; // 들어오는거 확인
          console.log('room에 문장 추가.');
          ModifyActionHandler(modifiedSentence);
          return body;
        });
      },
    );
  };

  const onHandleDebounce = debounce((modifiedSentence) => {
    dispatch(documentModifyAction(modifiedSentence));
  }, 500);

  const ModifyActionHandler = (modifiedSentence) => {
    onHandleDebounce(modifiedSentence);
  };

  const disconnectSocket = (stompClient) => {
    stompClient.disconnect(() => {
      console.log('room socket disconnected');
    });
  };

  // redux에 저장되어있는 documentReducer 가져오기
  useEffect(() => {
    getDocuments(
      roomId,
      documentId,
      (response) => {
        dispatch(documentGetAction(response.data.data));
      },
      (error) => {
        console.log(`error`, error);
      },
    );

    connectSocket();

    return () => {
      // stompClientTest.disconnect();
    };
  }, []);

  return (
    <S.CommonWorkPage oncopy="return false" oncut="return false">
      <S.HeaderSpace>
        <S.HeaderLeft>
          <S.HeaderTitle>제목 : {roomTitle}</S.HeaderTitle>
        </S.HeaderLeft>
        <S.HeaderRight>
          <RoomSettingButtonContainer
            stompClientTest={stompClientTest}
            disconnectSocket={disconnectSocket}
          />
        </S.HeaderRight>
      </S.HeaderSpace>
      <S.UsableSpace>
        <S.LeftSide>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <DocumentContainer
              sentences={sentences}
              testRequest={testRequest}
              onHandleClickSentence={onHandleClickSentence}
              stompClientTest={stompClientTest}
            />
          </Scrollbars>
        </S.LeftSide>
        <S.RightSide>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <CommentContainer
              sentenceId={onFocusedSentence}
              onHandleClickSentence={onHandleClickSentence}
            />
          </Scrollbars>
        </S.RightSide>
      </S.UsableSpace>
      {/* <Participant /> */}
      <OpenViduMain />
    </S.CommonWorkPage>
  );
}

const S = {
  CommonWorkPage: styled.div`
    width: 100%;
    height: 100%;
    /* padding-top: 86px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #ffffeb, #ffcbee);
  `,
  HeaderSpace: styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
  `,
  HeaderTitle: styled.span`
    font-family: 'S-CoreDream-6Bold';
    font-size: 1.2rem;
  `,
  HeaderRight: styled.div``,
  HeaderLeft: styled.div``,
  UsableSpace: styled.div`
    width: 80%;
    height: 90%;
    display: flex;
    justify-content: space-evenly;
  `,
  LeftSide: styled.div`
    flex-basis: 55%;
    box-shadow: 0 0 30px #dddddd;
    border-radius: 20px;
    overflow: hidden;
    background-color: white;
  `,
  RightSide: styled.div`
    flex-basis: 35%;
    box-shadow: 0 0 30px #dddddd;
    border-radius: 20px;
    overflow: hidden;
    background-color: white;
  `,
};
