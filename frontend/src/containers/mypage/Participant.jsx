import React, { useState } from 'react';
import styled from 'styled-components';
import ParticipantBlock from '../../components/mypage/ParticipantBlock';
const participants = [
  { id: 1, name: 'Euisu', status: false },
  { id: 2, name: 'Dogyun', status: true },
  { id: 3, name: 'Jinwoo', status: true },
  { id: 4, name: 'Minhyuk', status: false },
  { id: 5, name: 'GunHaaaaeeaaaaaa', status: true },
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
          {participants.length ? participants.length : null}
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
  position: absolute;
  bottom: 40px;
  right: 0;
  z-index: 99;
  transition: all 0.2s ease-in-out;
  transform: translateY(0px);
  &:hover {
    transform: translateY(-10px);
  }
`;

const PersonListButton = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  margin-right: 75px;
  padding: 20px;
  font-family: 'Samlip';
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 2px 2px 4px 2px #bbbbbb;
  transition: all 0.2s ease-in-out;
  background-color: #ffffff;
  /* &:hover {
    background-color: #ff8144;
  } */
  animation-duration: 1s;
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 50px, 0);
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  bottom: 75px;
  right: 5px;
  z-index: 99;
  width: fit-content;
  height: auto;
`;
