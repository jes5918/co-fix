import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  color: ${({ propsColor }) => {
    propsColor ? propsColor : 'black';
  }};
  font-family: ${({ PropsFontFamily }) => {
    PropsFontFamily ? PropsFontFamily : 'NotoSans';
  }};
  font-weight: ${({ propsFontWeight }) => {
    propsFontWeight ? propsFontWeight : 'bold';
  }};
  font-size: 32px;
  width: auto;
`;
const StyleH1Input = styled.input`
  display: block;
  font-size: 32px;
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

export default function _TextH1({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  const [edit, setEdit] = useState(true);
  const [h1Value, seth1Value] = useState('Frontend');
  useEffect(() => {
    if (content) {
      seth1Value(content);
    }
  }, [content]);
  const onHandleDebounce = debounce((e) => {
    seth1Value(e);
  }, 200);
  const changeh1Value = (e) => {
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
        <StyledH1
          propsColor={propsColor}
          propsFontWeight={propsFontWeight}
          PropsFontFamily={PropsFontFamily}
          onDoubleClick={() => {
            onHandleEdit();
          }}
        >
          {h1Value}
        </StyledH1>
      ) : (
        <StyleH1Input
          type="text"
          defaultValue={h1Value}
          onChange={changeh1Value}
          onBlur={onHandleEdit}
          autoFocus={true}
        />
      )}
    </div>
  );
}
