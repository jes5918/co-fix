import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  color: ${({ propsColor }) => {
    propsColor ? propsColor : 'black';
  }};
  font-family: ${({ PropsFontFamily }) => {
    PropsFontFamily ? PropsFontFamily : 'NotoSans';
  }};
  font-weight: ${({ propsFontWeight }) => {
    propsFontWeight ? propsFontWeight : 400;
  }};
`;

export default function _TextH1({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  return (
    <div>
      <StyledH1
        propsColor={propsColor}
        propsFontWeight={propsFontWeight}
        PropsFontFamily={PropsFontFamily}
      >
        {content}
      </StyledH1>
    </div>
  );
}
