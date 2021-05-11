import React from 'react';
import { useSelector } from 'react-redux';

// library
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

// containers
import ScreenSlideDivider from '../containers/ScreenSlideDivider';
import Participant from '../containers/mypage/Participant';
import DocumentContainer from '../containers/DocumentContainer';
import CommentContainer from '../containers/CommentContainer';

// components
import CalcContentLength from '../containers/mypage/CalcContentLength';

const testData = [
  {
    id: 0,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickname: '비와 당신',
    comment: '지금 이 순간, 마법처럼 날 묶어왔던 사슬을 벗어던진다.',
  },
  {
    id: 1,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickname: '비와 당신',
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque , e.',
  },
];

export default function Room() {
  // redux에 저장되어있는 documentReducer 가져오기
  const datas = useSelector((state) => {
    return state.document;
  });

  return (
    <BackGround>
      <MyPageContainer>
        <MyPageHeader>
          {datas && <MyPageTitle>{datas.title}</MyPageTitle>}
        </MyPageHeader>
        <ScreenSlideDivider>
          <>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <DocumentContainer />
            </Scrollbar>
            <CalcContentLength datas={datas.statements} />
          </>
          <Scrollbar style={{ width: '100%', height: '100%' }}>
            <CommentContainer data={testData} />
          </Scrollbar>
        </ScreenSlideDivider>
      </MyPageContainer>
      <Participant />
    </BackGround>
  );
}

// 백그라운드
const BackGround = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  background-color: #f9f5f4;
`;

// 안쪽 컨텐츠 컨테이너
const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 87vh;
  margin: 0px auto;
  font-family: 'Roboto';
  font-size: 18px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 20px;
`;

// 제목
const MyPageHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const MyPageTitle = styled.div`
  margin: -25px auto 45px;
  background-color: white;
  padding: 8px 20px;
  font-size: 24px;
  font-weight: bold;
  transition: all 1s ease;
  border-radius: 255px 15px 255px 15px/15px 255px 15px 255px;
  box-shadow: 0px 0px 8px 1px hsla(0, 0%, 0%, 0.3);
`;
