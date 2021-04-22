import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

// logo
import Logo from '../assets/Logo.png';

// containers
import Modal from '../containers/Modal';

// components
import BasicButton from '../components/common/BasicButton';
import GithubAuth from '../components/login/GithubAuth';
import GoogleAuth from '../components/login/GoogleAuth';
import CheckBox from '../components/common/CheckBox';

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const LogoIcon = styled.img.attrs({ src: Logo })`
  width: 60%;
  margin: 10px auto 20px;
`;
const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomLine = styled.div`
  width: 90%;
  height: 1.5px;
  margin: 10px auto 5px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FooterText = styled.div`
  width: 90%;
  margin: 10px;
  text-align: center;
  font-size: 4px;
  color: rgba(0, 0, 0, 0.6);

  span {
    font-weight: bold;
  }
`;

interface MatchParams {
  id: string;
}

function Home({ match }: RouteComponentProps<MatchParams>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState<boolean>(false);

  const ModalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const AutoLoginToggleHandler = () => {
    setIsAutoLoginChecked(!isAutoLoginChecked);
  };

  return (
    <>
      <Modal
        ModalToggleHandler={ModalToggleHandler}
        isModalOpen={isModalOpen}
        width="270px"
        height="320px"
      >
        <ModalContentWrapper>
          <LogoIcon />
          <SocialLoginWrapper>
            <GoogleAuth />
            <GithubAuth />
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
    </>
  );
}

export default Home;
