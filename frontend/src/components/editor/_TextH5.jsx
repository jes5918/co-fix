import React from 'react';
import styled from 'styled-components';

const StyledH5 = styled.h5`
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

export default function _TextH5({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  return (
    <div>
      <StyledH5
        propsColor={propsColor}
        propsFontWeight={propsFontWeight}
        PropsFontFamily={PropsFontFamily}
      >
        {content}
      </StyledH5>
    </div>
  );
}
