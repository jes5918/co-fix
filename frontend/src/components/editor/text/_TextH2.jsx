import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

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
  font-size: 24px;
`;
const StyleH2Input = styled.input`
  display: block;
  font-size: 24px;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bolder;
  width: auto;
  &:focus {
    border: dotted 1px black;
  }
`;

export default function _TextH2({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  const [edit, setEdit] = useState(true);
  const [h2Value, seth2Value] = useState('Frontend');
  useEffect(() => {
    if (content) {
      seth2Value(content);
    }
  }, [content]);
  const onHandleDebounce = debounce((e) => {
    seth2Value(e);
  }, 200);
  const changeh2Value = (e) => {
    onHandleDebounce(e.target.value);
  };
  const onHandleEdit = () => {
    if (edit) {
      setEdit(!edit);
    } else {
      setEdit(!edit);
    }
  };
  return (
    <div>
      {edit ? (
        <StyledH2
          propsColor={propsColor}
          propsFontWeight={propsFontWeight}
          PropsFontFamily={PropsFontFamily}
        >
          {h2Value}
        </StyledH2>
      ) : (
        <StyleH2Input
          type="text"
          defaultValue={h2Value}
          onChange={changeh2Value}
          onBlur={onHandleEdit}
          autoFocus={true}
        />
      )}
    </div>
  );
}
