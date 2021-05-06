import React from 'react';
import styled from 'styled-components';
import _Title from '../containers/makepjt/_Title';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fedbdb;
`;
export default function CreatePjt() {
  return (
    <Wrapper>
      <_Title />
    </Wrapper>
  );
}
