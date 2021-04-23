import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface IInputStyle {
  width: number;
  height: number;
}

const Input = styled.input<IInputStyle>`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  box-shadow: 3px 6px 3px rgba(0, 0, 0, 0.1);
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  padding-left: 18px;
  padding-right: 18px;
  font-family: 'NotoSans';
  font-size: 1rem;
`;

interface FormProps extends IInputStyle {
  onSubmit: (searchWord: string) => void;
  width: number;
  height: number;
}

const InputForm = ({ onSubmit, width, height }: FormProps) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchWord);
    setSearchWord('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="searchWord"
        ref={inputRef}
        value={searchWord}
        onChange={onChange}
        width={width}
        height={height}
      />
    </form>
  );
};

export default InputForm;
