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

export default function Title({ onHandleNext }) {
  return (
    <ContainerFrame>
      <LeftFrame>
        <InputLabel>첨삭 프로젝트</InputLabel>
        <InputLabel>제목을 입력해주세요.</InputLabel>
      </LeftFrame>
      <RightFrame>
        <InputForm width={400} height={70}></InputForm>
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
