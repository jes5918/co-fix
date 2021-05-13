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
const Point1 = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: ${({ step }) => `${step >= 0 ? '#ca385d' : '#fff'}`};
  z-index: 3;
`;
const Point2 = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: ${({ step }) => `${step >= 1 ? '#ca385d' : '#fff'}`};
  z-index: 3;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.15s;
`;
const Point3 = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: ${({ step }) => `${step >= 2 ? '#ca385d' : '#fff'}`};
  z-index: 3;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.15s;
`;
const Line1 = styled.div`
  width: 200px;
  height: 4px;
  z-index: 2;
  box-shadow: ${({ step }) =>
    `${step >= 1 ? 'inset 200px 0 0 0 #ca385d' : 'inset 0 0 0 0 #ca385d'}`};
  background-color: ${({ step }) => `${step >= 2 ? '#ca385d' : '#fff'}`};
  transition: all 0.5s ease-in-out;
`;
const Line2 = styled.div`
  width: 200px;
  height: 4px;
  z-index: 2;
  box-shadow: ${({ step }) =>
    `${step >= 2 ? 'inset 200px 0 0 0 #ca385d' : 'inset 0 0 0 0 #ca385d'}`};
  background-color: ${({ step }) => `${step >= 2 ? '#ca385d' : '#fff'}`};
  transition: all 0.5s ease-in-out;
`;
export default function Progress({ step, onHandleCurrent }) {
  return (
    <ProgressBar>
      <Point1 step={step} onClick={() => onHandleCurrent(0)} />
      <Line1 step={step}></Line1>
      <Point2 step={step} onClick={() => onHandleCurrent(1)}></Point2>
      <Line2 step={step}></Line2>
      <Point3 step={step} onClick={() => onHandleCurrent(2)}></Point3>
    </ProgressBar>
  );
}
