import React from 'react';
import GitHubLogin from 'react-github-login';
import styled from 'styled-components';

// api instance
import { githubLoginInstance } from '../../api/accounts/login';

const GitHubLoginButton = styled(GitHubLogin)`
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

function GithubAuth(props: Props) {
  const onSuccess = (response: any) => {
    console.log(response);
    const formData = new FormData();
    formData.append('code', response.code);
    githubLoginInstance(
      formData,
      (res: any) => {
        console.log(`res`, res);
      },
      (err: any) => {
        console.error('err', err);
      },
    );
  };
  const onFailure = (response: any) =>
    console.error('Github Login Error', response);

  return (
    <>
      <GitHubLoginButton
        clientId="43ffc24363dcdbff3b83"
        onSuccess={onSuccess}
        onFailure={onFailure}
        scope="user"
        buttonText="Login with GitHub"
      />
    </>
  );
}

export default GithubAuth;
