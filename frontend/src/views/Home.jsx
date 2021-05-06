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

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -100px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;
const LogoIcon = styled.img.attrs({ src: Logo })`
  width: 70%;
  margin: 10px auto 30px;
`;
const SocialLoginWrapper = styled.div`
  display: flex;
  margin: 15px auto 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomLine = styled.div`
  width: 90%;
  height: 2px;
  margin: 10px auto 10px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FooterText = styled.div`
  width: 90%;
  margin: 15px;
  text-align: center;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.7);

  span {
    font-weight: bold;
  }
`;
const Cursor = styled.div`
  position: fixed;
  left: -10px;
  top: -10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(255, 149, 0, 0.4);
  transition: all 0.01s ease-in;
  z-index: -1;
`;

function Home({ match }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);
  const user = useLoginUser();

  useEffect(() => {
    console.log('@@@@', user);
  }, [user]);

  const ModalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const AutoLoginToggleHandler = () => {
    setIsAutoLoginChecked(!isAutoLoginChecked);
  };

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
    <>
      <Cursor
        style={{
          transform: `translate3d(${cursorXY.x}px, ${cursorXY.y}px, 0)`,
        }}
      />
      <Modal
        ModalToggleHandler={ModalToggleHandler}
        isModalOpen={isModalOpen}
        width="500px"
        height="600px"
      >
        <ModalContentWrapper>
          <LogoIcon />
          <SocialLoginWrapper>
            <GoogleAuth ModalToggleHandler={ModalToggleHandler} />
            <GithubAuth ModalToggleHandler={ModalToggleHandler} />
          </SocialLoginWrapper>
          <CheckBox
            onChange={AutoLoginToggleHandler}
            checked={isAutoLoginChecked}
          >
            로그인 상태 유지할래요.
          </CheckBox>
          <BottomLine />
          <FooterText>
            간편 로그인으로 <span>Devfolio</span>와 함께하세요.
          </FooterText>
        </ModalContentWrapper>
      </Modal>
      <BasicButton
        width={300}
        height={50}
        fontSize={24}
        onClickHandler={ModalToggleHandler}
        text="Login with Social"
      />
      {user && (
        <>
          <div>{JSON.stringify(user.authenticated)}</div>
          <div>{JSON.stringify(user.credentials)}</div>
        </>
      )}
      <Footer />
    </>
  );
}

export default Home;
