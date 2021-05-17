import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';
import BasicButton from '../common/BasicButton';
import InputForm from '../common/InputForm';
import useRoomInfo from '../../hook/useRoomInfo';

export default function ModifyRoomSettingModal({
  PropsComfirmHandler,
  setTitle,
  setNumParticipant,
  title,
  numParticipant,
}) {
  const onHandleTitleValue = (e) => {
    setTitle(e.target.value);
  };

  const onHandleNumValue = (e) => {
    const value = Number(e.target.value);
    setNumParticipant(value === 0 ? 1 : value > 10 ? 10 : value);
  };

  return (
    <ModifyRoomSettingModalContainer>
      <Modify.Header>방 설정 변경</Modify.Header>
      <Modify.TitleWrapper>
        <Modify.Title>제목</Modify.Title>
        <InputForm
          width={300}
          height={50}
          onValueHandler={onHandleTitleValue}
          value={title}
        />
      </Modify.TitleWrapper>
      <Modify.TitleWrapper>
        <Modify.Title>인원 수</Modify.Title>
        <InputForm
          width={300}
          height={50}
          type="number"
          step="1"
          min="1"
          max="10"
          onValueHandler={onHandleNumValue}
          value={numParticipant}
        />
      </Modify.TitleWrapper>
      {/* {RoomInfo && <TextWrapper>{RoomInfo}</TextWrapper>} */}
      <ButtonWrapper>
        {PropsComfirmHandler && (
          <BasicButton
            width={370}
            height={50}
            fontSize={18}
            color={'#ffffff'}
            backgroundColor={'#4da702'}
            onClickHandler={PropsComfirmHandler}
          >
            <FaCheck size={30} color={'#ffffff'} />
          </BasicButton>
        )}
        {/* {PropsRejectHandler && (
          <BasicButton
            width={100}
            height={50}
            fontSize={18}
            color={'white'}
            backgroundColor={'#ca483e'}
            onClickHandler={PropsRejectHandler}
            text="X"
          />
        )} */}
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
  margin-top: 25px;
`;

const Modify = {
  Header: styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px; ;
  `,
  TitleWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px 30px;
  `,
  Title: styled.div`
    font-size: 24px;
  `,
};
