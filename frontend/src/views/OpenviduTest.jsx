import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OpenViduMain from '../openvidu/OpenViduMain';

export default function OpenviduTest() {
  return (
    <O.Container>
      <O.Wrapper>
        <OpenViduMain />
      </O.Wrapper>
    </O.Container>
  );
}

const O = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-top: 100px;
  `,
  Wrapper: styled.div`
    width: 80vw;
    height: 80vh;
    padding-top: 100px;
    box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  `,
};
