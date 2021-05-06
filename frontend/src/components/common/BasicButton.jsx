import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  cursor: pointer;
  margin: ${({ margin }) => `${margin ? `${margin}px` : '10px'}`};
  border: none;
  font-family: 'Samlip';
  font-weight: bold;
  border-radius: 15px;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  background-color: ${({ backgroundColor }) =>
    `${backgroundColor ? backgroundColor : '#ff9500'}`};
  font-size: ${({ fontSize }) => `${fontSize ? `${fontSize}px` : '24px'}`};
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
  margin,
  onClickHandler,
  width,
  height,
  fontSize,
  backgroundColor,
}) {
  return (
    <Button
      margin={margin}
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
