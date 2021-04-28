import React from "react";
import styled from "styled-components";

const Header = styled.div`
  height: 10vh;
  text-align: center;
  line-height: 40px;
  margin: 10px auto 50px;
  font-size: 24px;
`;

function TemplateHeader({ children }) {
  return <Header>{children}</Header>;
}

export default TemplateHeader;
