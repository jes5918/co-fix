import React from 'react';
import styled from 'styled-components';

const StyledFooter = {
  container: styled.div`
    position: relative;
    padding: 6.25rem 0;
    background-color: #fedbdb;
    color: #090e36;
  `,
  rowBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export default function Footer() {
  return (
    <StyledFooter.container>
      <StyledFooter.rowBox>
        <div>
          <img src="/logo.png" alt="" />
        </div>
        <div></div>
        <div></div>
      </StyledFooter.rowBox>
    </StyledFooter.container>
  );
}
