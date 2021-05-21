import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputForm from '../../components/common/InputForm';
import BasicButton from '../../components/common/BasicButton';
import document from '../../assets/document.png';
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
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const InputLabel = styled.div`
  font-size: 45px;
  font-weight: bold;
  font-family: 'S-CoreDream-6Bold';
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
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 50%;
    justify-content: center;
  }
`;
const LeftTitleFrame = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    height: 30%;
    justify-content: center;
  }
`;
const LeftImgFrame = styled.img`
  height: 50%;
  display: flex;
  object-fit: contain;
  margin: auto;
  padding-top: 0px;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
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
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;
export default function MaxParticipant({ onHandleNext, value, onHandleValue }) {
  return (
    <ContainerFrame>
      <LeftFrame>
        <LeftTitleFrame>
          <InputLabel>
            최대 인원을
            <br />
            설정해주세요.
          </InputLabel>
        </LeftTitleFrame>
        <LeftImgFrame src={document} />
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
