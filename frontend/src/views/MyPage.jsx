import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplitPane, { Pane } from 'react-split-pane';
import Toggle from '../components/common/Toggle';
import MypageLeft from '../containers/mypage/MyPageLeft';
import MyPageRight from '../containers/mypage/MyPageRight';
import Participant from '../containers/mypage/Participant';
import Scrollbar from 'react-scrollbars-custom';
import JSONData from '../demo/demo.json';

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

const SplitPanel = {
  container: styled.div`
    width: 100%;
    height: 100%;
    /* 라이브러리에 Position absolute로 설정되어 있어서 다시설정  */
    .SplitPane {
      position: relative !important;
      padding: 10px;
    }

    .Resizer {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background: #000;
      opacity: 0.3;
      margin: 10px;
      z-index: 1;
      -moz-background-clip: padding;
      -webkit-background-clip: padding;
      background-clip: padding-box;
    }

    .Resizer.vertical {
      width: 11px;
      border-left: 5px solid rgba(255, 255, 255, 0);
      border-right: 5px solid rgba(255, 255, 255, 0);
      cursor: col-resize;
    }

    .Resizer.vertical:hover {
      border-left: 5px solid rgba(0, 0, 0, 0.5);
      border-right: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.horizontal {
      height: 11px;
      width: 100%;
      border-top: 5px solid rgba(255, 255, 255, 0);
      border-bottom: 5px solid rgba(255, 255, 255, 0);
      cursor: row-resize;
      width: 100%;
    }

    .Resizer.horizontal:hover {
      border-top: 5px solid rgba(0, 0, 0, 0.5);
      border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.disabled {
      cursor: not-allowed;
    }
    .Resizer.disabled:hover {
      border-color: transparent;
    }
  `,
};

const paneStyle = {
  boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '20px',
  padding: '25px 0px 10px 25px',
};

export default function MyPage() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isToggled, setIsToggled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <MyPageContainer>
        <MyPageHeader>
          <Toggle setIsToggled={setIsToggled} isToggled={isToggled} />
          <Participant />
        </MyPageHeader>
        {isToggled ? (
          <SplitPanel.container>
            <SplitPane
              split={windowSize >= 1000 ? 'vertical' : 'horizontal'}
              minSize={
                windowSize >= 1000
                  ? windowSize * 0.35
                  : window.innerHeight * 0.2
              }
              maxSize={
                windowSize >= 1000 ? windowSize * 0.6 : window.innerHeight * 0.5
              }
              defaultSize={parseInt(localStorage.getItem('myPageSplitPos'), 10)}
              onChange={(size) => {
                localStorage.setItem('myPageSplitPos', size);
              }}
              paneStyle={paneStyle}
            >
              <Scrollbar style={{ width: '100%', height: '100%' }}>
                <MypageLeft JSONData={JSONData} />
              </Scrollbar>
              <MyPageRight />
            </SplitPane>
          </SplitPanel.container>
        ) : (
          <SplitPanel.container></SplitPanel.container>
        )}
      </MyPageContainer>
    </>
  );
}
