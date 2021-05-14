import React, { useState } from 'react';
import styled from 'styled-components';
import useScrollFadeIn from '../../hook/useScrollFadeIn';

const Section = {
  wrapper: styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fdfcf9;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  temp: styled.div`
    width: ${({ width }) => `${width}%`};
    height: ${({ width }) => `${width}%`};
    max-width: 100%;
    max-height: 100%;
    background-color: #c5c5c5;
    border-radius: 5px;
  `,
};
export default function Section_2() {
  const animatedItem = {
    0: useScrollFadeIn('up', 1, 0),
    1: useScrollFadeIn('up', 1, 0.2),
    2: useScrollFadeIn('up', 1, 0.3),
    3: useScrollFadeIn('up', 1, 0.4),
  };
  return (
    <Section.wrapper>
      <Section.temp width={75} {...animatedItem[0]}></Section.temp>
    </Section.wrapper>
  );
}
