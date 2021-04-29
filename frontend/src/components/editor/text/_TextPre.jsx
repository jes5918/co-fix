import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

const StyledPre = styled.pre`
  color: ${({ propsColor }) => {
    propsColor ? propsColor : 'black';
  }};
  font-family: ${({ PropsFontFamily }) => {
    PropsFontFamily ? PropsFontFamily : 'NotoSans';
  }};
  font-weight: ${({ propsFontWeight }) => {
    propsFontWeight ? propsFontWeight : 400;
  }};
  font-size: ${({ PropsFontSize }) =>
    `${PropsFontSize ? PropsFontSize : 11}px`};
  text-align: ${({ PropsTextAlign }) => {
    PropsTextAlign ? PropsTextAlign : 'center';
  }};
`;
const StylePre = styled.textarea`
  display: block;
  font-size: 11px;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: normal;
  width: auto;
  &:focus {
    border: dotted 1px black;
  }
`;

export default function _TextPre({
  content,
  propsColor,
  propsFontWeight,
  PropsFontSize,
  PropsFontFamily,
  PropsTextAlign,
}) {
  const defaultContent = `
  포트폴리오의 모든 것.
  데브폴리오.
  `;
  const [edit, setEdit] = useState(true);
  const [preValue, setpreValue] = useState(defaultContent);
  useEffect(() => {
    if (content) {
      setpreValue(content);
    }
  }, [content]);
  const onHandleDebounce = debounce((e) => {
    setpreValue(e);
  }, 200);
  const changepreValue = (e) => {
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
        <StyledPre
          propsColor={propsColor}
          propsFontWeight={propsFontWeight}
          PropsFontSize={PropsFontSize}
          PropsFontFamily={PropsFontFamily}
          PropsTextAlign={PropsTextAlign}
        >
          {preValue}
        </StyledPre>
      ) : (
        <StylePre
          type="text"
          defaultValue={preValue}
          onChange={changepreValue}
          onBlur={onHandleEdit}
          autoFocus={true}
        />
      )}
    </div>
  );
}
