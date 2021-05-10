import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

// containers
import ScreenSlideDivider from '../containers/ScreenSlideDivider';
import Participant from '../containers/mypage/Participant';
import DocumentContainer from '../containers/DocumentContainer';
import CommentContainer from '../containers/CommentContainer';
import TEST from '../containers/TEST';
import MypageLeft from '../containers/mypage/MyPageLeft';
import MyPageRight from '../containers/mypage/MyPageRight';

// components
import Toggle from '../components/common/Toggle';
import CalcContentLength from '../containers/mypage/CalcContentLength';

export default function MyPage() {
  const datas = useSelector((state) => {
    return state.document;
  });
  const [isToggled, setIsToggled] = useState(true);

  return (
    <BackGround>
      <MyPageContainer>
        <Toggle setIsToggled={setIsToggled} isToggled={isToggled} />
        <MyPageHeader>
          {datas && <MyPageTitle>{datas.title}</MyPageTitle>}
        </MyPageHeader>
        {isToggled ? (
          <ScreenSlideDivider>
            <>
              <Scrollbar style={{ width: '100%', height: '100%' }}>
                <DocumentContainer />
              </Scrollbar>
              <CalcContentLength datas={datas.statements} />
            </>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <TEST />
              {/* <CommentContainer /> */}
            </Scrollbar>
          </ScreenSlideDivider>
        ) : (
          <ScreenSlideDivider>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <MypageLeft datas={datas.statements} />
            </Scrollbar>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <MyPageRight datas={datas.statements} />
            </Scrollbar>
          </ScreenSlideDivider>
        )}
      </MyPageContainer>
      <Participant />
    </BackGround>
  );
}

const BackGround = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  background-color: #f9f5f4;
`;
const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 93%;
  margin: 0px auto;
  font-family: 'Roboto';
  font-size: 18px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 20px;
  animation-duration: 1s;
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const MyPageHeader = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 0px;
`;

const MyPageTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
