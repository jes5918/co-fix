import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplitPane from 'react-split-pane';

export default function ScreenSlideDivider({ children, setSplitPosX }) {
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);
  const [windowHeightSize, setWindowHeightSize] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
      setWindowHeightSize(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <SplitPanel.container>
      <SplitPane
        split={
          windowWidthSize >= screen.width / 1.85 ? 'vertical' : 'horizontal'
        }
        minSize={
          windowWidthSize >= screen.width / 1.85
            ? windowWidthSize * 0.25
            : windowHeightSize * 0.2
        }
        maxSize={
          windowWidthSize >= screen.width / 1.85
            ? windowWidthSize * 0.5
            : windowHeightSize * 0.6
        }
        defaultSize={
          windowWidthSize >= screen.width / 1.85
            ? parseInt(localStorage.getItem('myPageSplitPosX'), 10) ||
              window.innerWidth / 2
            : parseInt(localStorage.getItem('myPageSplitPosY'), 10) ||
              window.innerHeight / 2
        }
        onChange={(size) => {
          setSplitPosX(size);
          windowWidthSize >= screen.width / 1.85
            ? localStorage.setItem('myPageSplitPosX', size)
            : localStorage.setItem('myPageSplitPosY', size);
        }}
        pane1Style={
          windowWidthSize >= screen.width / 1.85 ? pane1StyleRow : pane1StyleCol
        }
        pane2Style={
          windowWidthSize >= screen.width / 1.85 ? pane2StyleRow : pane2StyleCol
        }
      >
        {children}
      </SplitPane>
    </SplitPanel.container>
  );
}

const pane1StyleRow = {
  padding: '35px 0px 75px 45px',
  flexDirection: 'column',
  boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
};

const pane1StyleCol = {
  padding: '0px 20px 25px 25px',
  flexDirection: 'column',
  boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
};
const pane2StyleRow = {
  padding: '35px 0px 75px 45px',
  flexDirection: 'column',
  boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
};

const pane2StyleCol = {
  padding: '0px 20px 25px 25px',
  flexDirection: 'column',
  boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
};

const SplitPanel = {
  container: styled.div`
    width: 100%;
    height: 83vh;

    .SplitPane {
      position: relative !important;
      padding: 5px;
    }

    .Resizer {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background: #000;
      opacity: 0.3;
      margin: auto 10px;
      height: 85%;
      z-index: 1;
      -moz-background-clip: padding;
      -webkit-background-clip: padding;
      background-clip: padding-box;
    }

    .Resizer.vertical {
      width: 13px;
      border-left: 5px solid rgba(255, 255, 255, 0);
      border-right: 5px solid rgba(255, 255, 255, 0);
    }

    .Resizer.vertical:hover {
      border-left: 5px solid rgba(0, 0, 0, 0.5);
      border-right: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.horizontal {
      height: 13px;
      width: 90%;
      margin: 5px auto;
      border-top: 5px solid rgba(255, 255, 255, 0);
      border-bottom: 5px solid rgba(255, 255, 255, 0);
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
