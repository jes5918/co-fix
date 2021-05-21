import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  height: 80px;
  text-align: center;
  font-size: 32px;
  font-family: 'S-CoreDream-6Bold';
`;

function TemplateHeader({ children }) {
  return <Header>{children}</Header>;
}

export default TemplateHeader;
