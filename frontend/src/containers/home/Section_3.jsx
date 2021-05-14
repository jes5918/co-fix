import { Staylinked } from '@styled-icons/fa-brands';
import React from 'react';
import styled from 'styled-components';
import coFix from '../../assets/live.png';
import cloud from '../../assets/cloud.png';
import useScrollClipPath from '../../hook/useScrollClipPath';
import useScrollFadeIn from '../../hook/useScrollFadeIn';

const Section = {
  wrapper: styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 0;
  `,
  leftFrmae: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: relative;
  `,
  leftImg: styled.img`
    width: 80%;
    object-fit: contain;
    position: absolute;
    top: 10%;
  `,
  leftText: styled.div`
    font-size: 2.5rem;
    font-weight: bold;
    font-family: 'SCD_bold';
    z-index: 10;
    margin: 15px auto;
    cursor: pointer;
  `,
  rightFrmae: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
        <Section.leftText {...animatedFadeItem[2]}>Co-Fix</Section.leftText>
        <Section.leftText {...animatedFadeItem[3]}>Live</Section.leftText>
        <Section.leftText {...animatedFadeItem[4]}>
          Collaboration
        </Section.leftText>
      </Section.leftFrmae>
      <Section.rightFrmae>
        <Section.rightImg src={coFix} alt="" {...animatedFadeItem[1]} />
      </Section.rightFrmae>
    </Section.wrapper>
  );
}
