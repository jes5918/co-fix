import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
  border-color: ${({ propsBorderColor }) => {
    propsBorderColor ? propsBorderColor : 'black';
  }};
  border-width: ${({ propsBorderWidth }) => {
    propsBorderWidth ? propsBorderWidth : '100px';
  }};
  border-style: ${({ propsBorderStyle }) => {
    propsBorderStyle ? propsBorderStyle : 'solid';
  }};
`;

export default function _line({
  propsBorderColor,
  propsBorderWidth,
  propsBorderStyle,
}) {
  return (
    <>
      <StyledHr
        propsBorderColor={propsBorderColor}
        propsBorderWidth={propsBorderWidth}
        propsBorderStyle={propsBorderStyle}
      />
    </>
  );
}
