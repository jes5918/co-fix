import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';

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
      <ProgressBar
        completed={50}
        bgColor="#ff950e"
        width="20vw"
        height="25px"
        labelColor="#e80909"
      />
      <Wrapper>
        <Length>
          글자수 : {contentLength} 자 / &nbsp; <SetLength /> 자
        </Length>
      </Wrapper>
    </Container>
  );
}

export default CalcContentLength;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 30px 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const Length = styled.div``;
const SetLength = styled.input`
  width: 100px;
  height: 27px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;
