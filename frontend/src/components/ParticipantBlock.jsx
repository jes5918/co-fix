import React from 'react';
import styled from 'styled-components';
export default function ParticipantBlock({ participant }) {
  return (
    <BlockWrapper>
      <Status status={participant.status} />
      <Name>{participant.name}</Name>
    </BlockWrapper>
  );
}

const BlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  overflow: hidden;
  height: 40px;
  margin: 10px 15px;
  padding: 5px 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  animation-duration: 0.5s;
  animation-name: fadeInUp;
  &:hover {
    background-color: #cccccc;
  }
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

const Name = styled.div``;
const Status = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${({ status }) => (status ? 'blue' : 'red')};
`;
