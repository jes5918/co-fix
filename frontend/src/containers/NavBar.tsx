import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarMainWrapper = styled.div`
  position: sticky;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const NavbarLogo = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #ff9500;
`;

const NavbarMenuWraper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 20vw;
`;

const NavbarItem = styled.div`
  width: fit-content;
  height: fit-content;
  margin: auto 10px;

  a {
    padding: 2px;
    font-size: 18px;
    border-bottom: 3.5px solid transparent;
    transition: all 0.3s ease-in-out;
  }

  a:hover,
  a:focus {
    border-bottom: 3.5px solid #ff9500;
  }
`;

interface Props {}

function NavBar(props: Props) {
  const {} = props;

  return (
    <NavbarMainWrapper>
      <NavbarLogo>로고자리</NavbarLogo>
      <NavbarMenuWraper>
        <NavbarItem>
          <Link to="/">Social Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/testArea">TestArea</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/Toggle">Toggle</Link>
        </NavbarItem>
      </NavbarMenuWraper>
    </NavbarMainWrapper>
  );
}

export default NavBar;
