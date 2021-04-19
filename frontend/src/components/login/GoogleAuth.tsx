import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';

interface Props {}

function GoogleAuth(props: Props) {
  const {} = props;

  const responseGoogle = (response: any) => {
    console.log(response);
    // axios
    //   .post(url, data, { Authorization: response.tokenId })
    //   .then((res) => {
    //     console.log(`google to server response`, res);
    //   })
    //   .catch((err) => {
    //     console.error(`google to server error`, err);
    //   });
  };

  return (
    <>
      <GoogleLogin
        clientId="104208269073-aicolkevpqsuh5a57a22l3n5h3d00ori.apps.googleusercontent.com"
        buttonText="Login with Google"
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
