import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
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
  font-size: 13.28px;
`;
const StyleH5Input = styled.input`
  display: block;
  font-size: 13.28px;
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

export default function _TextH5({
  content,
  propsColor,
  propsFontWeight,
  PropsFontFamily,
}) {
  const [edit, setEdit] = useState(true);
  const [h5Value, seth5Value] = useState('Frontend');
  useEffect(() => {
    if (content) {
      seth5Value(content);
    }
  }, [content]);
  const onHandleDebounce = debounce((e) => {
    seth5Value(e);
  }, 200);
  const changeh5Value = (e) => {
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
        <StyledH5
          propsColor={propsColor}
          propsFontWeight={propsFontWeight}
          PropsFontFamily={PropsFontFamily}
        >
          {h5Value}
        </StyledH5>
      ) : (
        <StyleH5Input
          type="text"
          defaultValue={h5Value}
          onChange={changeh5Value}
          onBlur={onHandleEdit}
          autoFocus={true}
        />
      )}
    </div>
  );
}
