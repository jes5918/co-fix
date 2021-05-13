import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';

export default function ParticipantBlock({ participant }) {
  const [isMic, setIsMic] = useState(false);
  const [isCam, setIsCam] = useState(false);

  const onMicToggleHandler = () => {
    setIsMic(!isMic);
  };
  const onCamToggleHandler = () => {
    setIsCam(!isCam);
  };

  return (
    <BlockWrapper>
      <Name>{participant.name}</Name>
      <MicWraaper onClick={onMicToggleHandler}>
        {isMic ? <MicON /> : <MicOFF />}
      </MicWraaper>
      <CamWraaper onClick={onCamToggleHandler}>
        {isCam ? <CamON /> : <CamOFF />}
      </CamWraaper>
    </BlockWrapper>
  );
}

const BlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  overflow: hidden;
  height: 40px;
  margin: 7px 14px;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #c0c0c0;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  animation-duration: 0.5s;
  animation-name: fadeInUp;

  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 15px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const Name = styled.div`
  overflow: hidden;
`;

const MicWraaper = styled.div`
  margin-left: 10px;
  border-radius: 50%;
  padding: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.15);
    background-color: #d5d5d5;
  }
  &:active {
    background-color: #d5d5d5;
  }
`;
const MicON = styled(FaMicrophone)`
  color: #04ae55;
  width: 18px;
  height: 18px;
`;
const MicOFF = styled(FaMicrophoneSlash)`
  color: #acacac;
  width: 20px;
  height: 20px;
`;

const CamWraaper = styled.div`
  margin-left: 5px;
  border-radius: 50%;
  padding: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.15);
    background-color: #d5d5d5;
  }
  &:active {
    background-color: #d5d5d5;
  }
`;
const CamON = styled(MdVideocam)`
  color: #04ae55;
  width: 22px;
  height: 22px;
`;
const CamOFF = styled(MdVideocamOff)`
  color: #acacac;
  width: 21px;
  height: 21px;
`;
