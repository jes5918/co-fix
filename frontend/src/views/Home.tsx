import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

// containers
import Modal from '../containers/Modal';

// components
import BasicButton from '../components/common/BasicButton';
import GithubAuth from '../components/login/GithubAuth';
import GoogleAuth from '../components/login/GoogleAuth';

const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface MatchParams {
  id: string;
}

function Home({ match }: RouteComponentProps<MatchParams>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const ModalToggleHandler = () => {
    console.log('modal toggle');
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Modal
        ModalToggleHandler={ModalToggleHandler}
        isModalOpen={isModalOpen}
        width="500px"
        height="300px"
      >
        <SocialLoginWrapper>
          <GoogleAuth />
          <GithubAuth />
        </SocialLoginWrapper>
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
