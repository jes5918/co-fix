import React, { useState } from 'react';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';
import CommentBlock from '../../components/mypage/CommentBlock';

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  word-break: keep-all;
`;

function MypageLeft({ JSONData }) {
  return (
    <>
      <LeftPanel>
        {JSONData.statements.map((data, idx) => {
          return (
            <>
              <CommentBlock key={idx} data={data} />
            </>
          );
        })}
      </LeftPanel>
    </>
  );
}

export default MypageLeft;
