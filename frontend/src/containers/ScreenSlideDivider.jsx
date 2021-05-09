import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SplitPane from 'react-split-pane';

export default function ScreenSlideDivider({ children }) {
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
        split={windowWidthSize >= 1000 ? 'vertical' : 'horizontal'}
        minSize={
          windowWidthSize >= 1000
            ? windowWidthSize * 0.35
            : windowHeightSize * 0.2
        }
        maxSize={
          windowWidthSize >= 1000
            ? windowWidthSize * 0.6
            : windowHeightSize * 0.5
        }
        defaultSize={
          parseInt(localStorage.getItem('myPageSplitPos'), 10) ||
          windowWidthSize / 2
        }
        onChange={(size) => {
          localStorage.setItem('myPageSplitPos', size);
        }}
        paneStyle={paneStyle}
      >
        {children}
      </SplitPane>
    </SplitPanel.container>
  );
}

const paneStyle = {
  boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
  borderRadius: '20px',
  padding: '25px 25px 25px 25px',
};

const SplitPanel = {
  container: styled.div`
    width: 100%;
    height: 100%;

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
      width: 100%;
      border-top: 5px solid rgba(255, 255, 255, 0);
      border-bottom: 5px solid rgba(255, 255, 255, 0);
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
