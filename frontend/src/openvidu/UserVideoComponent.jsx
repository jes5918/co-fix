import React from 'react';
import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <>
      {streamManager !== undefined ? (
        <U.Streamcomponent>
          <OpenViduVideoComponent streamManager={streamManager} />
          <U.PtagWrraper>
            <U.Ptag>{getNicknameTag()}</U.Ptag>
          </U.PtagWrraper>
        </U.Streamcomponent>
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
  PtagWrraper: styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 0px;
    align-items: center;
  `,
  Ptag: styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 22px;
    margin-top: 5px;
    padding: 0px 7px;
    background: #dcdcda;
    color: #777777;
    font-size: 11px;
    font-weight: bold;
    font-family: 'NotoSans';
    border-radius: 10px;
  `,
};
