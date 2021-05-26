import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// library
import GoogleLogin from 'react-google-login';

// icons
import { FcGoogle } from 'react-icons/fc';

// api instance
import { googleLoginInstance } from '../../api/accounts/login';

// redux
import { useDispatch } from 'react-redux';
import { LoginAction } from '../../modules/actions/userActions';

export default function GoogleAuth({ ModalToggleHandler, setFlag, flag }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = ({ code }) => {
    googleLoginInstance(
      code,
      (res) => {
        dispatch(LoginAction(res.data.data));
        ModalToggleHandler();
        if (flag) {
          setFlag(false);
          history.push('/create');
        } else {
          window.location.href = '/';
        }
      },
      () => {},
    );
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLEAUTH_APP_CLIENT_ID}
        render={(renderProps) => (
          <GoogleLoginButton onClick={renderProps.onClick}>
            <GoolgeLoginCustomIcon />
            Login with&nbsp;<span>Google</span>
          </GoogleLoginButton>
        )}
        // isSignedIn={false}
        responseType="code"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  );
}

const GoolgeLoginCustomIcon = styled(FcGoogle)`
  width: 30px;
  height: 30px;
  margin: auto 10px auto 5px;
`;

const GoogleLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 55px;
  margin: 5px auto 10px;
  border: none;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  font-size: 18px;
  background-color: #fff;
  transition: all 0.25s ease-in-out;

  &:hover {
    opacity: 0.7;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.35);
  }

  span {
    font-weight: bold;
  }
`;
