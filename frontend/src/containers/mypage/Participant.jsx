import React, { useState } from 'react';
import styled from 'styled-components';
import ParticipantBlock from '../../components/ParticipantBlock';
const participants = [
  { id: 1, name: 'Euisu', status: false },
  { id: 2, name: 'Dogyun', status: true },
  { id: 3, name: 'Jinwoo', status: true },
  { id: 4, name: 'Minhyuk', status: false },
  { id: 5, name: 'GunHee', status: true },
];
export default function Participant() {
  const [isClicked, setIsClicked] = useState(false);

  const onClickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <Wrapper>
        <PersonListButton onClick={onClickHandler}>
          참가자 명단
        </PersonListButton>
        {isClicked && (
          <PersonListWrapper>
            {participants.map((participant, idx) => {
              return <ParticipantBlock key={idx} participant={participant} />;
            })}
          </PersonListWrapper>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: sticky;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: fit-content;
  z-index: 99;
  transition: all 0.2s ease-in-out;
  transform: translateY(20px);
  &:hover {
    transform: translateY(0px);
  }
`;

const PersonListButton = styled.div`
  width: 300px;
  padding: 10px;
  font-family: 'Samlip';
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 4px 4px 8px 4px #cec2f8;
  transition: all 0.2s ease-in-out;
  background-color: #d49dc3;
  &:hover {
    background-color: #e6c4db;
  }
  animation-duration: 1s;
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

const PersonListWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  bottom: 40px;
  left: calc(50vw - 450px);
  z-index: 999;
  width: 900px;
  height: auto;
`;
