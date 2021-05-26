import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  height: 80px;
  text-align: center;
  font-size: 32px;
  font-family: 'S-CoreDream-6Bold';
  @media only screen and (max-width: 1024px) {
    font-size: 28px;
    margin-top: 15px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 24px;
    margin-top: 25px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 20px;
    margin-top: 35px;
  }
`;

function TemplateHeader({ children }) {
  return <Header>{children}</Header>;
}

export default TemplateHeader;
