import { Staylinked } from '@styled-icons/fa-brands';
import React from 'react';
import styled from 'styled-components';
import coFix from '../../assets/live.png';
import useScrollClipPath from '../../hook/useScrollClipPath';
import useScrollFadeIn from '../../hook/useScrollFadeIn';

const Section = {
  wrapper: styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fff;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 0;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  `,
  leftFrmae: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: transparent;
    position: relative;
    padding: 5%;
    @media only screen and (max-width: 768px) {
      width: 100%;
      height: 50%;
      padding: 0% 5%;
    }
  `,
  leftTitle: styled.div`
    width: 100%;
    height: 20%;
    font-size: 2.5rem;
    font-family: 'S-CoreDream-6Bold';
    color: #f36c7e;
    @media only screen and (max-width: 768px) {
      font-size: 2rem;
    }
  `,

  leftContentFrame: styled.div`
    width: 100%;
    height: 80%;
    font-size: 17px;
    font-family: 'S-CoreDream-6Bold';
    display: flex;
    align-items: center;
    @media only screen and (max-width: 768px) {
      height: auto;
    }
  `,
  leftText: styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'S-CoreDream-6Bold';
    z-index: 10;
    margin: 15px auto;
    cursor: pointer;
    word-break: keep-all;
    line-height: 2.5rem;
    text-align: center;
    @media only screen and (max-width: 768px) {
      font-size: 1rem;
    }
  `,
  rightFrmae: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 768px) {
      width: 100%;
      height: 50%;
    }
  `,
  rightImg: styled.img`
    width: 80%;
    object-fit: contain;
  `,
};
export default function Section_3() {
  const animatedItem = {
    0: useScrollClipPath('right', 1, 0),
    1: useScrollClipPath('left', 1, 0),
    2: useScrollClipPath('up', 1, 0),
    3: useScrollClipPath('up', 1, 0),
  };
  const animatedFadeItem = {
    0: useScrollFadeIn('right', 1, 0),
    1: useScrollFadeIn('left', 1, 0),
    2: useScrollFadeIn('right', 1, 0.2),
    3: useScrollFadeIn('right', 1, 0.3),
    4: useScrollFadeIn('right', 1, 0.4),
  };
  return (
    <Section.wrapper>
      <Section.leftFrmae>
        <Section.leftTitle {...animatedFadeItem[2]}>
          CO-FIX STORY
        </Section.leftTitle>
        <Section.leftContentFrame {...animatedFadeItem[3]}>
          <Section.leftText>
            CO-FIX는 비대면 온라인 첨삭의 불편함을
            <br /> 줄이기 위해 시작되었습니다.
            <br />
            화상 미팅, 실시간 공유 문서, 의견 취합을 <br />
            모두 한 번에 가능하게 해<br /> 편리한 라이브 온라인 첨삭 플랫폼을
            만들게 되었습니다.
          </Section.leftText>
        </Section.leftContentFrame>
      </Section.leftFrmae>
      <Section.rightFrmae>
        <Section.rightImg src={coFix} alt="" {...animatedFadeItem[1]} />
      </Section.rightFrmae>
    </Section.wrapper>
  );
}
