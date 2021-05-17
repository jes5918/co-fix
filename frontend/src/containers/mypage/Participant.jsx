import React, { useState } from 'react';
import styled from 'styled-components';
import onair from '../../assets/on-air.png';
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
          <PersonListButtonImg src={onair} alt="" />
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
  bottom: 3vh;
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
  width: 60px;
  height: 60px;
  margin-right: 4vw;
  /* padding: 20px; */
  font-family: 'S-CoreDream-6Bold';
  font-size: 20px;
  color: #020236;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 2px 2px 4px 2px #bebebe;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  background: linear-gradient(to bottom, #fef9d7, #d299c2);
  &:hover {
    background-color: #ffffff;
  }
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
const PersonListButtonImg = styled.img`
  height: 60%;
  object-fit: contain;
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
