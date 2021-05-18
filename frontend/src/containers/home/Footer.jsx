import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const StyledFooter = {
  container: styled.div`
    position: relative;
    padding: 6.25rem 0;
    background-color: #fff7f7;
    color: #090e36;
    font-family: 'S-CoreDream-6Bold';
    z-index: 0;
    @media only screen and (max-width: 480px) {
      padding: 2.25rem 0;
    }
  `,
  rowBox: styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `,
};
const FooterLogo = styled.img.attrs({ src: '/logo.png' })`
  width: 50%;
  object-fit: cover;
  margin: 0;
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;
const FooterLeft = {
  container: styled.div`
    width: 25%;
    @media only screen and (max-width: 768px) {
      width: 45%;
    }
  `,
  info: styled.div`
    font-size: 17px;
    font-weight: bold;
    font-family: 'S-CoreDream-6Bolds';
    width: fit-content;
    margin: 10px;
    color: black;
    @media only screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
    @media only screen and (max-width: 480px) {
      font-size: 10px;
    }
  `,
};

const FooterNav = {
  container: styled.div`
    width: 25%;
    @media only screen and (max-width: 768px) {
      width: 45%;
    }
  `,
  menu: styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    font-family: 'S-CoreDream-6Bold';
    width: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
    @media only screen and (max-width: 768px) {
      font-size: 1.25rem;
    }
    @media only screen and (max-width: 480px) {
      font-size: 15px;
    }
  `,
};

export default function Footer({ ModalToggleHandler, setFlag, flag }) {
  const history = useHistory();
  const onClickCreateHandler = () => {
    if (localStorage.getItem('user')) {
      history.push('/create');
    } else {
      ModalToggleHandler();
    }
  };
  const onClickHistoryHandler = () => {
    if (localStorage.getItem('user')) {
      history.push('/history');
    } else {
      ModalToggleHandler();
    }
  };
  return (
    <StyledFooter.container>
      <StyledFooter.rowBox>
        <FooterLeft.container>
          <FooterLogo />
          <FooterLeft.info>@Co-Fix. All rights reserved.</FooterLeft.info>
          <FooterLeft.info>Privacy Policy</FooterLeft.info>
        </FooterLeft.container>
        <FooterNav.container>
          <FooterNav.menu
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Home
          </FooterNav.menu>
          <FooterNav.menu
            onClick={() => {
              onClickHistoryHandler();
              setFlag(true);
            }}
          >
            History
          </FooterNav.menu>
          <FooterNav.menu
            onClick={() => {
              onClickCreateHandler();
            }}
          >
            Start Co-Fix Project
          </FooterNav.menu>
          <FooterNav.menu>Contact Us</FooterNav.menu>
        </FooterNav.container>
      </StyledFooter.rowBox>
    </StyledFooter.container>
  );
}
