import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import { Steering2 } from '@styled-icons/remix-fill';

function CalcContentLength({
  datas,
  sentences,
  splitPosX,
  windowWidthSize,
  right,
}) {
  const [contentLength, setContentLength] = useState(0);
  const [maxLength, setMaxLength] = useState(1500);
  const [percent, setPercent] = useState(0);

  const onMaxLengthChangeHandler = (e) => {
    console.log(e.target.value);
    setMaxLength(Number(e.target.value));
  };

  useEffect(() => {
    if (datas) {
      let contentLengthTemp = 0;
      datas.forEach((data) => {
        contentLengthTemp += data.modifiedContent.length;
      });
      setContentLength(contentLengthTemp);
    }
  }, [datas]);

  useEffect(() => {
    if (sentences) {
      setContentLength(sentences.length);
    }
  }, [sentences]);

  // progress bar percent 계산
  useEffect(() => {
    setPercent(Math.round((contentLength / maxLength) * 100));
  }, [maxLength, contentLength]);

  return (
    <Container>
      {!right ? (
        splitPosX ? (
          splitPosX > 700 || windowWidthSize < screen.width / 1.85 ? (
            <ProgressBar
              completed={percent}
              bgColor="lightcoral"
              width={
                windowWidthSize > screen.width / 1.85
                  ? String(splitPosX * 0.55) + 'px'
                  : String(windowWidthSize * 0.35) + 'px'
              }
              height="25px"
              labelColor="#000000"
            />
          ) : null
        ) : (
          <ProgressBar
            completed={percent}
            bgColor="lightcoral"
            width={'500px'}
            height="25px"
            labelColor="#000000"
          />
        )
      ) : (
        <ProgressBar
          completed={percent}
          bgColor="lightcoral"
          width={
            windowWidthSize > screen.width / 1.85
              ? String(screen.width / 1.85 - splitPosX * 0.8) + 'px'
              : '0px'
          }
          height={windowWidthSize > screen.width / 1.85 ? '25px' : '0px'}
          display="none"
          labelColor="#000000"
        />
      )}
      <Wrapper>
        <Length>
          {contentLength} 자 / &nbsp;
          <SetLength
            type="number"
            min="0"
            max="2000"
            value={maxLength}
            onChange={onMaxLengthChangeHandler}
          />
          &nbsp; 자
        </Length>
      </Wrapper>
    </Container>
  );
}

export default CalcContentLength;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 15px 0px 5px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  align-items: center;
  font-size: 1.15rem;
  font-weight: bold;
  overflow: hidden;
`;

const Length = styled.div`
  overflow: hidden;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  margin: 0;
  padding: 3px;
`;
const SetLength = styled.input`
  width: 80px;
  height: 27px;
  font-family: 'S-CoreDream-6Bold';
  font-size: 1.15rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  resize: none;
  overflow: hidden;
  -webkit-appearance: none;
  -moz-appearance: none;
`;
