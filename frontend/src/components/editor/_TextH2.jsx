import React from 'react';
import styled from 'styled-components';

const StyledH2 = styled.h2`
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

export default function _TextH2({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  return (
    <div>
      <StyledH2
        propsColor={propsColor}
        propsFontWeight={propsFontWeight}
        PropsFontFamily={PropsFontFamily}
      >
        {content}
      </StyledH2>
    </div>
  );
}
