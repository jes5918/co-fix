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

// dummy data
import JSONData from '../demo/demo.json';

export default function MyPage() {
  const datas = useSelector((state) => {
    return state.document.statements;
  });
  const [isToggled, setIsToggled] = useState(true);

  return (
    <>
      <MyPageContainer>
        <MyPageHeader>
          <Toggle setIsToggled={setIsToggled} isToggled={isToggled} />
          <Participant />
        </MyPageHeader>
        {isToggled ? (
          <ScreenSlideDivider>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <DocumentContainer />
            </Scrollbar>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <TEST />
              {/* <CommentContainer /> */}
            </Scrollbar>
          </ScreenSlideDivider>
        ) : (
          <ScreenSlideDivider>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <MypageLeft datas={datas} />
            </Scrollbar>
            <Scrollbar style={{ width: '100%', height: '100%' }}>
              <MyPageRight />
            </Scrollbar>
          </ScreenSlideDivider>
        )}
      </MyPageContainer>
    </>
  );
}

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 85%;
  margin: 100px auto 0px;
`;

const MyPageHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
