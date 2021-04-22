import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

// api instance
import { googleLoginInstance } from '../../api/accounts/login';

const GoogleLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const GoolgeLoginCustomIcon = styled(FcGoogle)`
  width: 30px;
  height: 30px;
  margin: auto 10px auto 5px;
`;

interface Props {}

function GoogleAuth(props: Props) {
  const {} = props;

  const responseGoogle = (response: any) => {
    console.log(response);
    googleLoginInstance(
      response.code,
      (res: any) => {
        console.log(`res`, res);
      },
      (err: any) => {
        console.error('err', err.response.data);
      },
    );
  };

  return (
    <>
      <GoogleLogin
        clientId="104208269073-aicolkevpqsuh5a57a22l3n5h3d00ori.apps.googleusercontent.com"
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
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

export default GoogleAuth;
