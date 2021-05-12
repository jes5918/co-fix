import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OpenViduMain from '../openvidu/OpenViduMain';

export default function OpenviduTest() {
  return (
    <O.Container>
      <OpenViduMain />
    </O.Container>
  );
}

const O = {
  Container: styled.div`
    display: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-top: 86px;
  `,
};
