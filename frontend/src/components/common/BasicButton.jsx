import React from "react";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  cursor: pointer;
  margin: 10px;
  border: none;
  border-radius: 30px;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  background-color: ${({ backgroundColor }) =>
    `${backgroundColor ? backgroundColor : "#ff9500"}`};
  font-size: ${({ fontSize }) => `${fontSize ? `${fontSize}px` : "24px"}`};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  transition: all 0.2s ease-in;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  }
`;

function BasicButton({
  text,
  onClickHandler,
  width,
  height,
  fontSize,
  backgroundColor,
}) {
  return (
    <Button
      height={height}
      width={width}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
}

export default BasicButton;
