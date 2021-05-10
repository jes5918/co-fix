import React from 'react';
import styled from 'styled-components';

const Section = {
  wrapper: styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fcf7ef;
    z-index: 0;
  `,
};
export default function Section_2() {
  return <Section.wrapper></Section.wrapper>;
}
