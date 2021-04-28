import React, { useState, useRef } from "react";
import styled from "styled-components";

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  box-shadow: 3px 6px 3px rgba(0, 0, 0, 0.1);
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  padding-left: 18px;
  padding-right: 18px;
  font-family: "NotoSans";
  font-size: 1rem;
`;

const InputForm = ({ onSubmit, width, height }) => {
  const [searchWord, setSearchWord] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchWord);
    setSearchWord("");
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
        value={searchWord}
        onChange={onChange}
        width={width}
        height={height}
      />
    </form>
  );
};

export default InputForm;
