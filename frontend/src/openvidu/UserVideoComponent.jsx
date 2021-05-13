import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import { MdVideocamOff, MdVideocam } from 'react-icons/md';

export default function UserVideoComponent({
  streamManager,
  isPublisher,
  isSpeak,
}) {
  const [isMic, setIsMic] = useState(true);
  const [isCam, setIsCam] = useState(true);

  const onMicToggleHandler = () => {
    if (isMic) {
      streamManager.publishAudio(false);
      setIsMic(false);
    } else {
      streamManager.publishAudio(true);
      setIsMic(true);
    }
  };

  const onCamToggleHandler = () => {
    if (isCam) {
      streamManager.publishVideo(false);
      setIsCam(false);
    } else {
      streamManager.publishVideo(true);
      setIsCam(true);
    }
  };

  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <>
      {streamManager !== undefined ? (
        <>
          {isPublisher ? (
            <U.Streamcomponent>
              <OpenViduVideoComponent
                streamManager={streamManager}
                isSpeak={isSpeak}
                isPublisher={true}
              />
              <U.PtagWrapper>
                <U.Ptag>{getNicknameTag()}</U.Ptag>
              </U.PtagWrapper>
              <U.MediaWrapper>
                <U.MicWraaper onClick={() => onMicToggleHandler()}>
                  {isMic ? <MicON /> : <MicOFF />}
                </U.MicWraaper>
                <U.CamWraaper onClick={() => onCamToggleHandler()}>
                  {isCam ? <CamON /> : <CamOFF />}
                </U.CamWraaper>
              </U.MediaWrapper>
            </U.Streamcomponent>
          ) : (
            <U.Streamcomponent>
              <OpenViduVideoComponent
                streamManager={streamManager}
                isSpeak={isSpeak}
                isPublisher={false}
              />
              <U.PtagWrapper>
                <U.Ptag>{getNicknameTag()}</U.Ptag>
              </U.PtagWrapper>
            </U.Streamcomponent>
          )}
        </>
      ) : null}
    </>
  );
}

const U = {
  Streamcomponent: styled.div`
    position: relative;
    width: 100%;
    height: auto;
  `,
  PtagWrapper: styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: baseline;
    padding: 0px;
    align-items: center;
  `,
  Ptag: styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin-top: 2%;
    margin-left: 2%;
    padding: 1% 2%;
    background: white;
    color: #000000;
    font-size: 11px;
    font-weight: bold;
    font-family: 'NotoSans';
    border-radius: 10px;
  `,
  MediaWrapper: styled.div`
    position: absolute;
    bottom: 3%;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 0px;
    align-items: center;
  `,
  MicWraaper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 5px 5px;
    transition: all 0.3s ease-in-out;
    background-color: #d5d5d5;
    &:hover {
      transform: scale(1.15);
      background-color: #d5d5d5;
    }
    &:active {
      background-color: #d5d5d5;
    }
  `,
  CamWraaper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    border-radius: 50%;
    padding: 5px 5px;
    transition: all 0.3s ease-in-out;
    background-color: #d5d5d5;
    &:hover {
      transform: scale(1.15);
      background-color: #d5d5d5;
    }
    &:active {
      background-color: #d5d5d5;
    }
  `,
};

const MicON = styled(FaMicrophone)`
  color: #04ae55;
  width: 20px;
  height: 20px;
`;
const MicOFF = styled(FaMicrophoneSlash)`
  color: #8f8e8e;
  width: 22px;
  height: 22px;
`;

const CamON = styled(MdVideocam)`
  color: #04ae55;
  width: 23px;
  height: 23px;
`;
const CamOFF = styled(MdVideocamOff)`
  color: #8f8e8e;
  width: 23px;
  height: 23px;
  /* width: 22px;
  height: 22px; */
`;
