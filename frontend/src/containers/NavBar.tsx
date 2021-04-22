import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

// logo
import Logo from '../assets/Logo.png';

const NavbarMainWrapper = styled.div`
  position: sticky;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
  width: 100%;
  height: 45px;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const NavbarLogo = styled.img.attrs({ src: Logo })`
  cursor: pointer;
  height: 100%;
  width: auto;
  margin: 5px;
`;

const NavbarMenuWraper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 20vw;
`;

const NavbarItem = styled.div`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  margin: auto 10px;

  a {
    padding: 2px;
    font-size: 12px;
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
  const history = useHistory();

  const LogoClickHandler = () => {
    if (location.pathname === '/') {
      return null;
    } else {
      history.push('/');
    }
  };
  return (
    <NavbarMainWrapper>
      <NavbarLogo onClick={LogoClickHandler} />
      <NavbarMenuWraper>
        <NavbarItem>
          <Link to="/">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/testArea">TestArea</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/Toggle">Toggle</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/Editor">Editor</Link>
        </NavbarItem>
      </NavbarMenuWraper>
    </NavbarMainWrapper>
  );
}

export default NavBar;
