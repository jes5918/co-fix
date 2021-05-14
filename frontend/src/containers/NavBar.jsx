import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

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

export default function NavBar({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  // 모달 토글 핸들러(로그인)
  const ModalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 자동 로그인 토글 핸들러
  const AutoLoginToggleHandler = () => {
    setIsAutoLoginChecked(!isAutoLoginChecked);
  };

  // 햄버거 메뉴 토글 핸들러
  const HamburgerMenuToggleHandler = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  // 로고 클릭하면 어디로 갈지
  const LogoClickHandler = () => {
    if (history.location.pathname === '/') {
      return null;
    } else {
      history.push('/');
    }
  };

  // 로그아웃
  const LogoutHandler = () => {
    dispatch(logoutUserAction);
  };

  return (
    <>
      <NavbarMainWrapper>
        <NavbarLogo onClick={LogoClickHandler} />
        <HamburgerMenu.Container>
          {isLoggedIn ? (
            <>
              {user.name && (
                <HamburgerMenu.Name>{user.name}</HamburgerMenu.Name>
              )}
              <HamburgerMenu.Icon onClick={HamburgerMenuToggleHandler} />
              {isHamburgerMenuOpen ? (
                <HamburgerMenu.Wrapper>
                  <NavbarItem onClick={HamburgerMenuToggleHandler}>
                    <Link to="/mypagelist">MyPageList</Link>
                  </NavbarItem>
                  <NavbarItem onClick={HamburgerMenuToggleHandler}>
                    <Link to="/mypage">MyPage</Link>
                  </NavbarItem>
                  <NavbarItem onClick={HamburgerMenuToggleHandler}>
                    <Link to="/create">Create</Link>
                  </NavbarItem>
                  <NavbarItem onClick={HamburgerMenuToggleHandler}>
                    <Link to="/co-fix/asd">Co-Fix</Link>
                  </NavbarItem>
                  <NavbarItem onClick={HamburgerMenuToggleHandler}>
                    <Link to="/openvidutest">openvidutest</Link>
                  </NavbarItem>
                  <BasicButton
                    onClickHandler={LogoutHandler}
                    width={150}
                    height={40}
                    fontSize={17}
                    backgroundColor="transparent"
                    text="로그아웃"
                  />
                </HamburgerMenu.Wrapper>
              ) : null}
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
        </HamburgerMenu.Container>
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
            간편 로그인으로 <span>Co-Fix</span>와 함께하세요.
          </FooterText>
        </ModalContentWrapper>
      </Modal>
    </>
  );
}

const NavbarMainWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
  width: 100%;
  height: 86px;
`;

const NavbarLogo = styled.img.attrs({ src: '/logo.png' })`
  width: auto;
  height: 100%;
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
  width: fit-content;
  height: fit-content;
  margin: auto 10px;
  padding: 10px;
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

const HamburgerMenu = {
  Container: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  `,
  Name: styled.div`
    font-size: 17px;
    margin-right: 10px;
  `,
  Icon: styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #fadfa6;
    transition: all 0.1s ease-in-out;
    box-shadow: rgba(48, 48, 47, 0.2) 0px 7px 5px 0px;
    &:hover {
      background-color: #fa9696;
    }
  `,
  Wrapper: styled.div`
    position: absolute;
    right: 2%;
    top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 800;
    width: 200px;
    height: fit-content;
    background-color: white;
    box-shadow: rgba(48, 48, 47, 0.548) 0px 5px 10px 0px;
    border-radius: 10px;
    animation: modal-show 1s;
    @keyframes modal-show {
      from {
        opacity: 0;
        margin-bottom: -100px;
      }
      to {
        opacity: 1;
        margin-bottom: 0;
      }
    }
  `,
};
