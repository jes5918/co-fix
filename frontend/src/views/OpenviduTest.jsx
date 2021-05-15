import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OpenViduMain from '../openvidu/OpenViduMain';
import RommSettingButtonContainer from '../containers/RoomSettingButtonContainer';

export default function OpenviduTest() {
  return (
    <>
      <O.Container>
        <RommSettingButtonContainer />
      </O.Container>
      <OpenViduMain />
    </>
  );
}

const O = {
  Container: styled.div`
    display: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 100vw;
    height: 100vh;
    padding-top: 86px;
  `,
};
