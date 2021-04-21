import React, { ReactElement } from 'react';
import styled from 'styled-components';
interface toggleProps extends styleToggleProps {}

interface styleToggleProps {}

const toggleStyle = {
  toggleSwitch: styled.label`
    position: absolute;
    display: inline-block;
    width: 80px;
    height: 34px;
    border-radius: 30px;
    box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  `,
  toggleInput: styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span::before {
      transform: translateX(46px);
    }
    &:checked + span {
      background-color: #ff9500;
    }
  `,
  slider: styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 30px;
    transition: 0.4s;
    &::before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  `,
};

function Toggle(props: toggleProps) {
  const {} = props;

  return (
    <toggleStyle.toggleSwitch>
      <toggleStyle.toggleInput type="checkbox" />
      <toggleStyle.slider />
    </toggleStyle.toggleSwitch>
  );
}

export default Toggle;
