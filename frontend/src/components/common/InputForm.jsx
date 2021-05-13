import { Max } from '@styled-icons/simple-icons';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 15px;
  background-color: white;
  box-shadow: 3px 6px 3px rgba(0, 0, 0, 0.1);
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  padding-left: 18px;
  padding-right: 18px;
  font-family: 'Samlip';
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
`;

const InputForm = ({
  width,
  height,
  type,
  step,
  min,
  max,
  value,
  onValueHandler,
}) => {
  return (
    <Input
      name="searchWord"
      value={value}
      onChange={(e) => {
        onValueHandler(e);
      }}
      width={width}
      height={height}
      autoFocus={true}
      type={type ? type : 'text'}
      step={step}
      min={min}
      max={max}
    />
  );
};

export default InputForm;
