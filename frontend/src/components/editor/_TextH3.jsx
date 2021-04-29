import React from 'react';
import styled from 'styled-components';

const StyledH3 = styled.h3`
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

export default function _TextH3({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  return (
    <div>
      <StyledH3
        propsColor={propsColor}
        propsFontWeight={propsFontWeight}
        PropsFontFamily={PropsFontFamily}
      >
        {content}
      </StyledH3>
    </div>
  );
}
