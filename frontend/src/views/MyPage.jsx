import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// library
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// containers
import ScreenSlideDivider from '../containers/ScreenSlideDivider';
import Participant from '../containers/mypage/Participant';
import DocumentContainer from '../containers/DocumentContainer';
import CommentContainer from '../containers/CommentContainer';
import TEST from '../containers/TEST';
import MypageLeft from '../containers/mypage/MyPageLeft';
import MyPageRight from '../containers/mypage/MyPageRight';

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

// 커스터마이징 탭
const CustomTab = ({ children }) => (
  <Tab
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0px 15px 0px 0px',
      padding: '10px',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
      fontWeight: 'bold',
      fontSize: '20px',
      transition: 'all 0.6s cubic-bezier(0, 0, 0, 1)',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#d3d3d3')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
  >
    <div>{children}</div>
  </Tab>
);

CustomTab.tabsRole = 'Tab';

export default function MyPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const datas = useSelector((state) => {
    return state.document;
  });

  return (
    <BackGround>
      <StyledTabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList style={TabListStyle}>
          <CustomTab>1</CustomTab>
          <CustomTab>2</CustomTab>
          {tabIndex === 0 ? (
            <TagName>자소서 / 첨삭 결과 </TagName>
          ) : (
            <TagName>원본 자소서 / 수정 자소서</TagName>
          )}
        </TabList>
        <MyPageContainer>
          <MyPageHeader>
            {datas && <MyPageTitle>{datas.title}</MyPageTitle>}
          </MyPageHeader>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </MyPageContainer>
      </StyledTabs>
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

// 왼쪽 위에 탭 스타일
const TabListStyle = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 7vw',
  border: 'none',
  zIndex: 300,
};

const TagName = styled.div`
  font-weight: bold;
  font-size: 22px;
  transition: all 0.5s ease-in-out;
`;

const StyledTabs = styled(Tabs)`
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
