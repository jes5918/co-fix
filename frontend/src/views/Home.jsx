import React, { useState } from 'react';
import styled from 'styled-components';

// logo
import Logo from '../assets/logo.png';

// userHook
import useLoginUser from '../hook/useLoginUser';

// containers
import Modal from '../containers/Modal';

// components
import GithubAuth from '../components/login/GithubAuth';
import GoogleAuth from '../components/login/GoogleAuth';

import Footer from '../containers/home/Footer';
import Section_1 from '../containers/home/Section_1';
import Section_2 from '../containers/home/Section_2';
import Section_3 from '../containers/home/Section_3';
import Section_4 from '../containers/home/Section_4';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);

  const ModalToggleHandler = () => {
    if (isModalOpen) {
      setFlag(false);
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <HomeWrapper>
        <Section_1
          className={'test'}
          ModalToggleHandler={ModalToggleHandler}
          setFlag={setFlag}
          flag={flag}
        />
        <Section_2 className="test" />
        <Section_3 className="test" />
        <Section_4 className="test" />
        <Footer
          ModalToggleHandler={ModalToggleHandler}
          setFlag={setFlag}
          flag={flag}
        />
      </HomeWrapper>
      <Modal
        ModalToggleHandler={ModalToggleHandler}
        isModalOpen={isModalOpen}
        width="500px"
        height="600px"
      >
        <ModalContentWrapper>
          <LogoIcon />
          <SocialLoginWrapper>
            <GoogleAuth
              ModalToggleHandler={ModalToggleHandler}
              setFlag={setFlag}
              flag={flag}
            />
            <GithubAuth
              ModalToggleHandler={ModalToggleHandler}
              setFlag={setFlag}
              flag={flag}
            />
          </SocialLoginWrapper>
          <BottomLine />
          <FooterText>
            간편 로그인으로 <span>Co-Fix</span>와 함께하세요.
          </FooterText>
        </ModalContentWrapper>
      </Modal>
    </>
  );
}

const HomeWrapper = styled.div`
  width: 100%;
  animation-duration: 1s;
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      transform: translate3d(0, 50px, 0);
      opacity: 0;
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

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
  margin: 40px auto 10px;
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
