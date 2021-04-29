import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
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
  font-size: 16px;
`;
const StyleH4Input = styled.input`
  display: block;
  font-size: 16px;
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

export default function _TextH4({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  const [edit, setEdit] = useState(true);
  const [h4Value, seth4Value] = useState('Frontend');
  useEffect(() => {
    if (content) {
      seth4Value(content);
    }
  }, [content]);
  const onHandleDebounce = debounce((e) => {
    seth4Value(e);
  }, 200);
  const changeh4Value = (e) => {
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
        <StyledH4
          propsColor={propsColor}
          propsFontWeight={propsFontWeight}
          PropsFontFamily={PropsFontFamily}
        >
          {h4Value}
        </StyledH4>
      ) : (
        <StyleH4Input
          type="text"
          defaultValue={h4Value}
          onChange={changeh4Value}
          onBlur={onHandleEdit}
          autoFocus={true}
        />
      )}
    </div>
  );
}
