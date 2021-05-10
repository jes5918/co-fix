import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';
import { FaPaste } from 'react-icons/fa';

function MyPageRight({ datas }) {
  const [dataString, setDataString] = useState('');
  const [currentValue, setCurrentValue] = useState(dataString);
  const [contentLength, setContentLength] = useState(0);
  const textRef = useRef();

  // 인풋의 변화
  const changeh1Value = (e) => {
    setCurrentValue(e.target.value);
  };

  // 카피
  const onCopyClickHandler = (e) => {
    textRef.current.select();
    document.execCommand('copy');
  };

  // 초기렌더에 필요
  useEffect(() => {
    textRef.current.style.height = '30px';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  });

  // 값 변화에 필요
  useEffect(() => {
    textRef.current.style.height = '30px';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, [currentValue]);

  // 데이터 만들기
  useEffect(() => {
    let temp = '';
    datas.forEach((data) => {
      temp += data.content;
      temp += '\n';
    });
    setDataString(temp);
    // eslint-disable-next-line
  }, []);

  // 글자수 변화
  useEffect(() => {
    setContentLength(currentValue.length);
  }, [currentValue]);

  // eslint-disable-next-line
  useEffect(() => {
    if (contentLength === 0) {
      setContentLength(dataString.length);
    }
  });

  return (
    <>
      <PasteWrapper onClick={onCopyClickHandler}>
        <PasteIcon />
        복사하기
      </PasteWrapper>
      <TextAreaWrapper>
        <Scrollbar style={{ width: '100%', height: '100%' }}>
          <TextArea
            defaultValue={dataString}
            ref={textRef}
            onChange={changeh1Value}
            autoFocus={true}
          />
        </Scrollbar>
      </TextAreaWrapper>
      <Container onClick={onCopyClickHandler}>
        글자수 : {contentLength} 자
      </Container>
    </>
  );
}

export default MyPageRight;

const PasteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 65px;
  top: 15px;
  z-index: 10;
  font-weight: bold;
  font-size: 18px;
`;

const PasteIcon = styled(FaPaste)`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;
const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 20px 0px 0px;
`;

const TextArea = styled.textarea`
  width: 96%;
  font-size: 18px;
  font-family: 'Roboto';
  line-height: 30px;
  padding: 50px 30px 30px;
  border-radius: 255px 15px 255px 15px/15px 255px 15px 255px;
  box-shadow: 6px 6px 20px -6px hsla(0, 0%, 0%, 0.3);
  outline: none;
  resize: none;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin: 20px 5px;
`;
