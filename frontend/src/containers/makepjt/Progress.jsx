import React from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  width: 50%;
  position: absolute;
  top: 12%;
  left: 50vw;
  margin: 0 -25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Point = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: ${({ backgroundColor }) =>
    `${backgroundColor ? '#ca385d' : '#fff'}`};
  z-index: 3;
`;
const Line = styled.div`
  width: 20%;
  height: 5px;
  z-index: 2;
  background-color: ${({ backgroundColor }) =>
    `${backgroundColor ? '#ca385d' : '#fff'}`};
`;
export default function Progress() {
  return (
    <ProgressBar>
      <Point></Point>
      <Line></Line>
      <Point></Point>
      <Line></Line>
      <Point></Point>
    </ProgressBar>
  );
}
