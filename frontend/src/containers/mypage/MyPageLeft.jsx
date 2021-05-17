import React, { useState } from 'react';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';
import CommentBlock from '../../components/mypage/CommentBlock';

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  word-break: keep-all;
  white-space: pre-wrap;
  line-height: 27px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'S-CoreDream-5Medium';
`;

function MypageLeft({ content }) {
  return (
    <>
      <LeftPanel>{content}</LeftPanel>
    </>
  );
}

export default MypageLeft;
