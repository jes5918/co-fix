import React from 'react';
import styled from 'styled-components';

const Section = {
  wrapper: styled.div`
    width: 100%;
    height: 80vh;
    background-color: transparent;
    z-index: 0;
  `,
};
export default function Section_1() {
  return <Section.wrapper></Section.wrapper>;
}
