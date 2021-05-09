import React from 'react';
import styled from 'styled-components';

const StyledFooter = {
  container: styled.div`
    position: relative;
    padding: 6.25rem 0;
    background-color: #fff7f7;
    color: #090e36;
    font-family: 'Samlip';
    z-index: -5;
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
`;
const FooterLeft = {
  container: styled.div`
    width: 25%;
  `,
  info: styled.div`
    font-size: 17px;
    font-weight: bold;
    font-family: 'Samlip';
    width: fit-content;
    margin: 10px;
    color: black;
  `,
};

const FooterNav = {
  container: styled.div`
    width: 25%;
  `,
  menu: styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Samlip';
    width: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
  `,
};
export default function Footer() {
  return (
    <StyledFooter.container>
      <StyledFooter.rowBox>
        <FooterLeft.container>
          <FooterLogo />
          <FooterLeft.info>@Co-Fix. All rights reserved.</FooterLeft.info>
          <FooterLeft.info>Privacy Policy</FooterLeft.info>
        </FooterLeft.container>
        <FooterNav.container>
          <FooterNav.menu>Home</FooterNav.menu>
          <FooterNav.menu>History</FooterNav.menu>
          <FooterNav.menu>Start Co-Fix Project</FooterNav.menu>
          <FooterNav.menu>Contact Us</FooterNav.menu>
        </FooterNav.container>
      </StyledFooter.rowBox>
    </StyledFooter.container>
  );
}
