import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

// api instance
import { googleLoginInstance } from '../../api/accounts/login';

const GoogleLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  margin: 20px auto;
  border: 1px solid;
  border-radius: 30px;
  font-size: 18px;
  background-color: #fff;
`;

interface Props {}

function GoogleAuth(props: Props) {
  const {} = props;

  const responseGoogle = (response: any) => {
    console.log(response);
    const formData = new FormData();
    formData.append('code', response.code);
    googleLoginInstance(
      formData,
      (res: any) => {
        console.log(`res`, res);
      },
      (err: any) => {
        console.error('err', err);
      },
    );
  };

  return (
    <>
      <GoogleLogin
        clientId="104208269073-aicolkevpqsuh5a57a22l3n5h3d00ori.apps.googleusercontent.com"
        render={(renderProps) => (
          <GoogleLoginButton onClick={renderProps.onClick}>
            Login with Google
          </GoogleLoginButton>
        )}
        isSignedIn={true}
        responseType="code"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}

export default GoogleAuth;
