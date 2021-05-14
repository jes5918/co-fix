import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveRoomInfo, resetRoomInfo } from '../modules/actions/roomActions';
import { getRoomInfo, closeRoom } from '../api/co-fix';
import { modifyDocuments } from '../api/documents';
import { getDocuments } from '../api/documents';
import { documentGetAction } from '../modules/actions/documentActions';
import {
  getAllComments,
  createComment,
  agreeComment,
} from '../api/comments.js';

// socket
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

// library
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';

// containers
import Participant from '../containers/mypage/Participant';
import DocumentContainer from '../containers/DocumentContainer';
import CommentContainer from '../containers/CommentContainer';

// components
import CalcContentLength from '../containers/mypage/CalcContentLength';
import OpenViduMain from '../openvidu/OpenViduMain';

import useRoomInfo from '../hook/useRoomInfo';

export default function CommonWorkPage() {
  const dispatch = useDispatch();
  const { roomId, documentId } = useRoomInfo();
  const sentences = useSelector((state) => {
    return state.document.data;
  });

  const [msg, setMsg] = useState(null);
  const [comments, setComments] = useState([]);
  const [onFocusedSentence, setOnFocusedSentence] = useState(sentences[0]);

  // socket
  const socket = new SockJS('https://k4b104.p.ssafy.io/api/wss');
  const stompClient = Stomp.over(socket);

  // sentence 클릭 -> comment 조회
  const onHandleClickSentence = (sentenceId) => {
    getAllComments(
      roomId,
      documentId,
      sentenceId,
      (res) => {
        console.log(res);
        setComments(res.data.data);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // comment 생성
  const onHandleSubmitComment = (sentenceId, nickname, content) => {
    createComment(
      roomId,
      documentId,
      sentenceId,
      {
        content,
        nickname,
      },
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // agree 요청
  const onHandleClickAgree = (sentenceId, commentId, nickname) => {
    agreeComment(
      roomId,
      documentId,
      sentenceId,
      commentId,
      nickname,
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // socket 테스트
  const testRequest = (sentenceId) => {
    modifyDocuments(
      roomId,
      documentId,
      sentenceId,
      {
        modifiedContent: '안녕하세요?23',
      },
      (res) => {
        console.log('반환되는 값입니다. : ', res);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  stompClient.connect({}, (frame) => {
    console.log(frame);
    stompClient.subscribe('/room/' + roomId, (res) => {
      const body = JSON.parse(res.body);
      console.log('res.body : ', body);
      setMsg(body);
      return body;
    });
  });

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

    // return () => {
    //   stompClient.disconnect(() => {
    //     console.log('socket disconnected');
    //   }, {});
    // };
  }, []);

  return (
    <S.CommonWorkPage>
      <S.UsableSpace>
        <S.LeftSide>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <DocumentContainer
              sentences={sentences}
              testRequest={testRequest}
              onHandleClickSentence={onHandleClickSentence}
            />
            <span>{msg && msg.sentence.sentenceId}</span>
          </Scrollbars>
        </S.LeftSide>
        <S.RightSide>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <CommentContainer
              comments={comments}
              sentenceId={onFocusedSentence.sentenceId}
              onHandleClickAgree={onHandleClickAgree}
              onHandleSubmitComment={onHandleSubmitComment}
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
    padding-top: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
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
  `,
  RightSide: styled.div`
    flex-basis: 35%;
    box-shadow: 0 0 30px #dddddd;
    border-radius: 20px;
    overflow: hidden;
  `,
};

const testData = [
  {
    id: 0,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickName: '비와 당신',
    comment: '지금 이 순간, 마법처럼 날 묶어왔던 사슬을 벗어던진다.',
  },
  {
    id: 1,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickName: '비와 당신',
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque , e.',
  },
  {
    id: 2,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickName: '비와 당신',
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque , e.',
  },
  {
    id: 3,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickName: '비와 당신',
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque , e.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque , e.',
  },
];
