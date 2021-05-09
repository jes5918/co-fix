import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  background: url(http://i.stack.imgur.com/ynxjD.png) repeat-y;
  width: 100%;
  height: 900px;
  font: normal 14px verdana;
  line-height: 25px;
  padding: 2px 10px;
  border: solid 1px #ddd;
  outline: none;
`;

function MyPageRight({ datas }) {
  const [dataString, setDataString] = useState('');
  useEffect(() => {
    let temp = '';
    datas.forEach((data) => {
      temp += data.content;
      temp += '\n';
    });
    setDataString(temp);
  }, [datas]);
  return (
    <>
      <TextArea defaultValue={dataString} />
    </>
  );
}

export default MyPageRight;
