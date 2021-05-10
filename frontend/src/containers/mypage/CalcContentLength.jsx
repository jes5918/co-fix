import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CalcContentLength({ datas }) {
  const [contentLength, setContentLength] = useState(0);
  useEffect(() => {
    let contentLength = 0;
    datas.forEach((data) => {
      contentLength += data.content.length;
    });
    setContentLength(contentLength);
  }, [datas]);
  return (
    <Container>
      <Wrapper> 글자수 : {contentLength} 자</Wrapper>
    </Container>
  );
}

export default CalcContentLength;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 5px 10px;
`;

const Wrapper = styled.div``;
