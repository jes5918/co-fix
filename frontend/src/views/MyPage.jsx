import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplitPane, { Pane } from 'react-split-pane';
import Toggle from '../components/common/Toggle';
import MypageLeft from '../containers/mypage/MyPageLeft';
import MyPageRight from '../containers/mypage/MyPageRight';
import Participant from '../containers/mypage/Participant';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  margin: 30px auto;
`;

const MyPageHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SplitPanel = {
  container: styled.div`
    width: 100%;
    height: 100%;
    margin: 20px auto;
    border: 1px solid;

    /* 라이브러리에 Position absolute로 설정되어 있어서 다시설정  */
    .SplitPane {
      position: relative !important;
    }

    .Resizer {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background: #000;
      opacity: 0.3;
      z-index: 1;
      -moz-background-clip: padding;
      -webkit-background-clip: padding;
      background-clip: padding-box;
    }

    .Resizer.vertical {
      width: 11px;
      margin: 0 -5px;
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
      margin: -5px 0;
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
                windowSize >= 1000 ? windowSize * 0.35 : windowSize * 0.2
              }
              maxSize={windowSize >= 1000 ? windowSize * 0.5 : windowSize * 0.5}
              defaultSize={parseInt(localStorage.getItem('myPageSplitPos'), 10)}
              onChange={(size) => {
                localStorage.setItem('myPageSplitPos', size);
              }}
            >
              <MypageLeft />
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
