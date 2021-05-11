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
  onSubmit,
  width,
  height,
  type,
  step,
  minNum,
  maxNum,
  value,
  onValueHandler,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchWord);
    setSearchWord('');
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="searchWord"
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onValueHandler(e);
        }}
        width={width}
        height={height}
        autoFocus={true}
        type={type ? type : 'text'}
        step={step}
        min={minNum}
        max={maxNum}
      />
    </form>
  );
};

export default InputForm;
