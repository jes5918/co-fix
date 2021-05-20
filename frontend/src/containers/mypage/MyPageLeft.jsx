import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';
import CommentBlock from '../../components/mypage/CommentBlock';

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  white-space: pre-wrap;
  line-height: 27px;
  padding-right: 30px;
  font-size: ${({ right }) => `${right ? '19px' : '18px'}`};
  font-weight: ${({ right }) => `${right ? '700' : 'bold'}`};
  font-family: ${({ right }) =>
    `${right ? 'Notosans' : 'S-CoreDream-5Medium'}`};
`;

function MypageLeft({ content, right }) {
  useEffect(() => {
    const IdName = right ? 'rightPanel' : 'leftPanel';
    const temp = document.getElementById(IdName);
    temp.innerHTML = content;
  }, []);

  return (
    <>
      <LeftPanel
        id={right ? 'rightPanel' : 'leftPanel'}
        right={right ? true : false}
      ></LeftPanel>
    </>
  );
}

export default MypageLeft;
