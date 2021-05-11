import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputForm from '../../components/common/InputForm';
import BasicButton from '../../components/common/BasicButton';
const ContainerFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 86px;
  /* justify-content: center;
  align-items: center; */
  animation-duration: 1s;
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;
const InputLabel = styled.div`
  font-size: 55px;
  font-weight: bold;
  font-family: 'Samlip';
  color: black;
  margin: 10px;
  word-break: keep-all;
  text-align: center;
`;
const LeftFrame = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 30px;
`;

const RightFrame = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 100px;
`;
export default function MaxParticipant({ onHandleNext, value, onHandleValue }) {
  return (
    <ContainerFrame>
      <LeftFrame>
        <InputLabel>최대 인원을 </InputLabel>
        <InputLabel>설정해주세요.</InputLabel>
      </LeftFrame>
      <RightFrame>
        <InputForm
          width={400}
          height={70}
          step="1"
          type="number"
          min="1"
          max="10"
          value={value}
          onValueHandler={onHandleValue}
        ></InputForm>
        <BasicButton
          text={'다음'}
          width={400}
          fontSize={20}
          height={50}
          backgroundColor={'#FE8D8D'}
          margin={30}
          onClickHandler={onHandleNext}
        ></BasicButton>
      </RightFrame>
    </ContainerFrame>
  );
}
