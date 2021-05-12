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

export default function NavBar({ isLoggedIn }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  // 반응형 작업을 위한 screen width 계산 작업
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth);

  // Boolean (반응형)
  const isHalfScreen = windowWidthSize > screen.width / 2;

  // 반응형을 위한 EventListner 등록
  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        {isHalfScreen ? (
          <NavbarMenuWraper>
            {!isLoggedIn ? (
              <>
                <NavbarItem>
                  <Link to="/mypagelist">MyPageList</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link to="/mypage">MyPage</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link to="/create">Create</Link>
                </NavbarItem>
                <NavbarItem>
                  <Link to="/co-fix/fasdf">Co-Fix</Link>
                </NavbarItem>
                <BasicButton
                  onClickHandler={LogoutHandler}
                  width={150}
                  height={40}
                  fontSize={17}
                  backgroundColor="transparent"
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
        ) : (
          <HamburgerMenu.Container>
            <HamburgerMenu.Icon onClick={HamburgerMenuToggleHandler} />
            {isHamburgerMenuOpen ? (
              <HamburgerMenu.Wrapper>
                {!isLoggedIn ? (
                  <>
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
                      <Link to="/commonWorkPage">Room</Link>
                    </NavbarItem>
                    <BasicButton
                      onClickHandler={LogoutHandler}
                      width={150}
                      height={40}
                      fontSize={17}
                      backgroundColor="transparent"
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
              </HamburgerMenu.Wrapper>
            ) : null}
          </HamburgerMenu.Container>
        )}
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
    z-index: 10;
  `,
  Icon: styled(GiHamburgerMenu)`
    width: 35px;
    height: 35px;
    cursor: pointer;
    color: #2f2f2f;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #898989;
    }
  `,
  Wrapper: styled.div`
    position: absolute;
    right: 10px;
    top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 800;
    width: 200px;
    height: fit-content;
    background-color: white;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
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
