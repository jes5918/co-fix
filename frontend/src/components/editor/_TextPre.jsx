import React from 'react';
import styled from 'styled-components';

const StyledPre = styled.pre`
  color: ${({ propsColor }) => {
    propsColor ? propsColor : 'black';
  }};
  font-family: ${({ PropsFontFamily }) => {
    PropsFontFamily ? PropsFontFamily : 'NotoSans';
  }};
  font-weight: ${({ propsFontWeight }) => {
    propsFontWeight ? propsFontWeight : 400;
  }};
  font-size: ${({ PropsFontSize }) =>
    `${PropsFontSize ? PropsFontSize : 15}px`};
  text-align: ${({ PropsTextAlign }) => {
    PropsTextAlign ? PropsTextAlign : 'center';
  }};
`;

export default function _TextPre({
  content,
  propsColor,
  propsFontWeight,
  PropsFontSize,
  PropsFontFamily,
  PropsTextAlign,
}) {
  return (
    <div>
      <StyledPre
        propsColor={propsColor}
        propsFontWeight={propsFontWeight}
        PropsFontSize={PropsFontSize}
        PropsFontFamily={PropsFontFamily}
        PropsTextAlign={PropsTextAlign}
      >
        {content}
      </StyledPre>
    </div>
  );
}
