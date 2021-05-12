import React from 'react';
import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';

export default function UserVideoComponent({ streamManager }) {
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <U.Wrapper>
      {streamManager !== undefined ? (
        <U.Streamcomponent>
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            <U.Ptag>{getNicknameTag()}</U.Ptag>
          </div>
        </U.Streamcomponent>
      ) : null}
    </U.Wrapper>
  );
}

const U = {
  Wrapper: styled.div``,
  Streamcomponent: styled.div`
    position: absolute;
    background: #f8f8f8;
    padding-left: 5px;
    padding-right: 5px;
    color: #777777;
    font-weight: bold;
    border-bottom-right-radius: 4px;
  `,
  Ptag: styled.p`
    margin: 0;
  `,
};
