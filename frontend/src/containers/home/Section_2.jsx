import React, { useState } from 'react';
import styled from 'styled-components';
import useScrollFadeIn from '../../hook/useScrollFadeIn';

const Section = {
  wrapper: styled.div`
    width: 100%;
    /* height: 100vh; */
    background-color: #fdfcf9;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 10%;
  `,
  videoFrame: styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 55%;
    overflow: hidden;
  `,
  youtube: styled.iframe`
    position: absolute;
    /* top: 0;
    left: 0; */
    width: 100%;
    height: 100%;
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
      {/* <Section.temp width={75} {...animatedItem[0]}></Section.temp> */}
      <Section.videoFrame>
        <Section.youtube
          width="560"
          height="315"
          src="https://www.youtube.com/embed/lXm5AdFigvc?autoplay=1 "
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          {...animatedItem[0]}
        ></Section.youtube>
      </Section.videoFrame>
    </Section.wrapper>
  );
}
