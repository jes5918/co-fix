import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  height: 900px;
  font-size: 18px;
  font-family: 'Roboto';
  line-height: 30px;
  padding: 30px 20px;
  border: solid 2px #ddd;
  outline: none;
  resize: none;
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
