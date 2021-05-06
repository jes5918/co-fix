import React from 'react';
import styled from 'styled-components';

const Styled = {
  Space: styled.div`
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: row;
  `,
};

const TestArea = () => {
  return <Styled.Space></Styled.Space>;
};

export default TestArea;
