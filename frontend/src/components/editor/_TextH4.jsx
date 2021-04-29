import React from 'react';
import styled from 'styled-components';

const StyledH4 = styled.h4`
  color: ${({ propsColor }) => {
    propsColor ? propsColor : 'black';
  }};
  font-weight: ${({ propsFontWeight }) => {
    propsFontWeight ? propsFontWeight : 400;
  }};
  font-family: ${({ PropsFontFamily }) => {
    PropsFontFamily ? PropsFontFamily : 'NotoSans';
  }};
`;

export default function _TextH4({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  return (
    <div>
      <StyledH4
        propsColor={propsColor}
        propsFontWeight={propsFontWeight}
        PropsFontFamily={PropsFontFamily}
      >
        {content}
      </StyledH4>
    </div>
  );
}
