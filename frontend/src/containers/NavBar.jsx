import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

// redux
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../modules/actions/userActions';

// components
import BasicButton from '../components/common/BasicButton';

const NavbarMainWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
  width: 100%;
  height: 86px;
  /* box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2); */
  /* margin-bottom: 30px; */
`;

const NavbarLogo = styled.img.attrs({ src: '/logo.png' })`
  cursor: pointer;
  width: auto;
  height: 100%;
  /* margin: 5px; */
  box-sizing: border-box;
`;

const NavbarMenuWraper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 10vw;
`;

const NavbarItem = styled.div`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  margin: auto 10px;

  a {
    padding: 2px;
    font-size: 18px;
    border-bottom: 4px solid transparent;
    transition: all 0.3s ease-in-out;
  }

  a:hover,
  a:focus {
    border-bottom: 4px solid #ff9500;
  }
`;

function NavBar({ isLoggedIn }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const LogoClickHandler = () => {
    if (history.location.pathname === '/') {
      return null;
    } else {
      history.push('/');
    }
  };

  const LogoutHandler = () => {
    dispatch(logoutUserAction);
  };

  return (
    <NavbarMainWrapper>
      <NavbarLogo onClick={LogoClickHandler} />
      <NavbarMenuWraper>
        {!isLoggedIn ? (
          <>
            <NavbarItem>
              <Link to="/testarea">TestArea</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/mypagelist">MyPageList</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/mypage">MyPage</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/create">Create</Link>
            </NavbarItem>
            <BasicButton
              onClickHandler={LogoutHandler}
              width={100}
              height={33}
              fontSize={15}
              backgroundColor="red"
              text="로그아웃"
            />
          </>
        ) : (
          <NavbarItem>
            <Link to="/">Login</Link>
          </NavbarItem>
        )}
      </NavbarMenuWraper>
    </NavbarMainWrapper>
  );
}

export default NavBar;
