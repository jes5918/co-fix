import React from 'react';
import styled from 'styled-components';
import BasicButton from '../common/BasicButton';

export default function AlertModal({
  PropsText,
  PropsComfirmHandler,
  PropsRejectHandler,
}) {
  return (
    <AlertModalContainer>
      <TextWrapper>{PropsText}</TextWrapper>
      <ButtonWrapper>
        <BasicButton
          width={180}
          height={50}
          fontSize={18}
          color={'white'}
          backgroundColor={'green'}
          onClickHandler={PropsComfirmHandler}
          text="확인"
        />
        {PropsRejectHandler && (
          <BasicButton
            width={180}
            height={50}
            fontSize={18}
            color={'white'}
            backgroundColor={'red'}
            onClickHandler={PropsRejectHandler}
            text="취소"
          />
        )}
      </ButtonWrapper>
    </AlertModalContainer>
  );
}

const AlertModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: bold;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
