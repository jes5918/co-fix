import React, { useState } from 'react';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';
import CommentBlock from '../../components/mypage/CommentBlock';

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  word-break: keep-all;
`;

function MypageLeft({ datas }) {
  console.log(`datas`, datas);
  return (
    <>
      <LeftPanel>
        {datas &&
          datas.map((data, idx) => {
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
