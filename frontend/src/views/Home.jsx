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
import Section_3 from '../containers/home/Section_3';
const HomeWrapper = styled.div`
  width: 100%;
`;

function Home() {
  return (
    <HomeWrapper>
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Footer />
    </HomeWrapper>
  );
}

export default Home;
