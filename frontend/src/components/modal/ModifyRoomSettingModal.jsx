import { Input } from '@styled-icons/material-twotone';
import React from 'react';
import styled from 'styled-components';
import BasicButton from '../common/BasicButton';
import InputForm from '../common/InputForm';

export default function ModifyRoomSettingModal({
  RoomInfo,
  PropsComfirmHandler,
  PropsRejectHandler,
}) {
  return (
    <ModifyRoomSettingModalContainer>
      <Modify.Header>방 설정 변경</Modify.Header>
      <Modify.TitleWrapper>
        <Modify.Title>제목</Modify.Title>
        <InputForm />
      </Modify.TitleWrapper>
      <Modify.TitleWrapper>
        <Modify.Title>인원 수</Modify.Title>
        <InputForm />
      </Modify.TitleWrapper>
      {/* {RoomInfo && <TextWrapper>{RoomInfo}</TextWrapper>} */}
      <ButtonWrapper>
        {PropsComfirmHandler && (
          <BasicButton
            width={180}
            height={50}
            fontSize={18}
            color={'white'}
            backgroundColor={'green'}
            onClickHandler={PropsComfirmHandler}
            text="확인"
          />
        )}
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
    </ModifyRoomSettingModalContainer>
  );
}

const ModifyRoomSettingModalContainer = styled.div`
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

const Modify = {
  Header: styled.div`
    text-align: center;
    font-size: 36px;
    margin-bottom: 30px; ;
  `,
  TitleWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0px 50px;
  `,
  Title: styled.div`
    font-size: 24px;
  `,
};
