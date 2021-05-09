import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';

// redux
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../modules/actions/userActions';

// components
import BasicButton from '../components/common/BasicButton';
import useLoginUser from '../hook/useLoginUser';
import GithubAuth from '../components/login/GithubAuth';
import GoogleAuth from '../components/login/GoogleAuth';
import CheckBox from '../components/common/CheckBox';
// logo
import Logo from '../assets/logo.png';

// containers
import Modal from '../containers/Modal';

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
  z-index: 10;
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
  z-index: 10;

  a {
    padding: 2px;
    font-size: 18px;
    border-bottom: 4px solid transparent;
    transition: all 0.3s ease-in-out;
  }

  a:hover,
  a:focus {
    border-bottom: 4px solid #fe8d8d;
  }
`;

//Modal

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -100px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const LogoIcon = styled.img.attrs({ src: Logo })`
  width: 70%;
  margin: 10px auto 30px;
`;
const SocialLoginWrapper = styled.div`
  display: flex;
  margin: 15px auto 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomLine = styled.div`
  width: 90%;
  height: 2px;
  margin: 10px auto 10px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FooterText = styled.div`
  width: 90%;
  margin: 15px;
  text-align: center;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.7);

  span {
    font-weight: bold;
  }
`;

function NavBar({ isLoggedIn }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);
  const user = useLoginUser();
  const ModalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const AutoLoginToggleHandler = () => {
    setIsAutoLoginChecked(!isAutoLoginChecked);
  };

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
    <>
      <NavbarMainWrapper>
        <NavbarLogo onClick={LogoClickHandler} />
        <NavbarMenuWraper>
          {isLoggedIn ? (
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
            <BasicButton
              width={150}
              height={40}
              fontSize={17}
              onClickHandler={ModalToggleHandler}
              text="Login"
              backgroundColor={'transparent'}
            />
          )}
        </NavbarMenuWraper>
      </NavbarMainWrapper>
      <Modal
        ModalToggleHandler={ModalToggleHandler}
        isModalOpen={isModalOpen}
        width="500px"
        height="600px"
      >
        <ModalContentWrapper>
          <LogoIcon />
          <SocialLoginWrapper>
            <GoogleAuth ModalToggleHandler={ModalToggleHandler} />
            <GithubAuth ModalToggleHandler={ModalToggleHandler} />
          </SocialLoginWrapper>
          <CheckBox
            onChange={AutoLoginToggleHandler}
            checked={isAutoLoginChecked}
          >
            로그인 상태 유지할래요.
          </CheckBox>
          <BottomLine />
          <FooterText>
            간편 로그인으로 <span>Devfolio</span>와 함께하세요.
          </FooterText>
        </ModalContentWrapper>
      </Modal>
    </>
  );
}

export default NavBar;
