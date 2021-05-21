import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ color }) => `${color ? `${color}` : 'black'}`};
  margin: ${({ margin }) => `${margin ? `${margin}px` : '10px'}`};
  border: ${({ border }) => `${border ? `${border}` : 'none'}`};
  font-weight: bold;
  border-radius: 15px;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.2);
  background-color: ${({ backgroundColor }) =>
    `${backgroundColor ? backgroundColor : '#ff9500'}`};
  font-size: ${({ fontSize }) => `${fontSize ? `${fontSize}px` : '24px'}`};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  transition: all 0.2s ease-in;
  /* z-index: 5; */

  &:hover {
    opacity: 0.7;
  }

  &:active {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  }
`;

function BasicButton({
  text,
  children,
  margin,
  onClickHandler,
  color,
  border,
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
      color={color}
      border={border}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      onClick={onClickHandler}
    >
      {text ? text : children}
    </Button>
  );
}

export default BasicButton;
