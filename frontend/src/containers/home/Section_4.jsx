import React from 'react';
import styled from 'styled-components';
import useScrollFadeIn from '../../hook/useScrollFadeIn';

const Section = {
  wrapper: styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to bottom, #fffdf3, #fce6f6);
    z-index: 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  `,
  card1: styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    box-shadow: 4px 4px 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin: 30px 0;
  `,
  card2: styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    box-shadow: 4px 4px 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    align-self: flex-end;
    margin: 30px 15px;
  `,
  card3: styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    box-shadow: 4px 4px 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin: 30px 0;
  `,
};
export default function Section_4() {
  const animatedFadeItem = {
    0: useScrollFadeIn('up', 1, 0),
    1: useScrollFadeIn('up', 1, 0.2),
    2: useScrollFadeIn('up', 1, 0.4),
    3: useScrollFadeIn('right', 1, 0.3),
    4: useScrollFadeIn('right', 1, 0.4),
  };
  return (
    <Section.wrapper>
      <Section.card1 {...animatedFadeItem[0]}></Section.card1>
      <Section.card2 {...animatedFadeItem[1]}></Section.card2>
      <Section.card3 {...animatedFadeItem[2]}></Section.card3>
    </Section.wrapper>
  );
}
