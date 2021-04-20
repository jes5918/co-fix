import React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  width: number;
  height: number;
  fontSize?: number;
  backgroundColor?: string;
}

const Button = styled.div<IButtonProps>`
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
  font-size: ${({ fontSize }) => `${fontSize ? `${fontSize}px` : '24px'}`};
  background-color: ${({ backgroundColor }) =>
    `${backgroundColor ? backgroundColor : '#ff9f1c'}`};
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  transition: all 0.2s ease-in;

  &:hover {
    background-color: ${({ backgroundColor }) =>
      `${backgroundColor ? backgroundColor : 'rgba(255, 81, 0, 0.883)'}`};
  }

  &:active {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  }
`;

interface BasicButtonProps extends IButtonProps {
  text: string;
  onClickHandler: () => void;
}

function BasicButton(props: BasicButtonProps) {
  const {
    text,
    onClickHandler,
    width,
    height,
    fontSize,
    backgroundColor,
  } = props;

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