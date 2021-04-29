import React from 'react';
import styled from 'styled-components';

const Styled = {
  SideBar: styled.div`
    width: 30%;
    height: 100%;
    background-color: #d3d3d3;
    display: flex;
    flex-wrap: wrap;
    padding: 12px;
  `,
};

const SideBar = ({ children }) => {
  return <Styled.SideBar>{children}</Styled.SideBar>;
};

export default SideBar;
