import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputForm from '../../components/common/InputForm';
import BasicButton from '../../components/common/BasicButton';
const ContainerFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputLabel = styled.div`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Samlip';
  margin: 30px;
`;

export default function _Title() {
  return (
    <ContainerFrame>
      <InputLabel>첨삭 프로젝트 제목을 입력해주세요.</InputLabel>
      <InputForm width={400} height={50}></InputForm>
      <BasicButton
        text={'NEXT!'}
        width={200}
        fontSize={20}
        height={40}
        backgroundColor={'#FE8D8D'}
        margin={30}
      ></BasicButton>
    </ContainerFrame>
  );
}
