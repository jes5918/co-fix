import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
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
  font-size: 18.72px;
`;
const StyleH3Input = styled.input`
  display: block;
  font-size: 18.72px;
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

export default function _TextH3({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  const [edit, setEdit] = useState(true);
  const [h3Value, seth3Value] = useState('Frontend');
  useEffect(() => {
    if (content) {
      seth3Value(content);
    }
  }, [content]);
  const onHandleDebounce = debounce((e) => {
    seth3Value(e);
  }, 200);
  const changeh3Value = (e) => {
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
        <StyledH3
          propsColor={propsColor}
          propsFontWeight={propsFontWeight}
          PropsFontFamily={PropsFontFamily}
        >
          {h3Value}
        </StyledH3>
      ) : (
        <StyleH3Input
          type="text"
          defaultValue={h3Value}
          onChange={changeh3Value}
          onBlur={onHandleEdit}
          autoFocus={true}
        />
      )}
    </div>
  );
}
