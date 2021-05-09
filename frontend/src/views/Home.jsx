import React, { useState, useEffect, useSpring } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';

// logo
import Logo from '../assets/logo.png';

// containers
import Modal from '../containers/Modal';

// components
import BasicButton from '../components/common/BasicButton';
import GithubAuth from '../components/login/GithubAuth';
import GoogleAuth from '../components/login/GoogleAuth';
import CheckBox from '../components/common/CheckBox';

import useLoginUser from '../hook/useLoginUser';
import Footer from '../containers/home/Footer';
import Section_1 from '../containers/home/Section_1';
import Section_2 from '../containers/home/Section_2';
const HomeWrapper = styled.div`
  margin-top: 86px;
  width: 100%;
`;

const Cursor = styled.div`
  position: fixed;
  left: -10px;
  top: -10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(210, 153, 194, 0.2);
  transition: all 0.01s ease-in;
  z-index: 0;
`;

function Home() {
  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX - 20;
      const y = e.clientY - 20;
      setCursorXY({ x, y });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <HomeWrapper>
      <Cursor
        style={{
          transform: `translate3d(${cursorXY.x}px, ${cursorXY.y}px, 0)`,
        }}
      />
      <Section_1 />
      <Section_2 />
      <Section_1 />
      <Footer />
    </HomeWrapper>
  );
}

export default Home;
