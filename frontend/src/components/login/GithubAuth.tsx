import React from 'react';
import GitHubLogin from 'react-github-login';
import styled from 'styled-components';
import { SiGithub } from 'react-icons/si';

// api instance
import { githubLoginInstance } from '../../api/accounts/login';

const GitHubLoginButton = styled(GitHubLogin)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 200px;
  height: 35px;
  margin: 10px auto;
  border: none;
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 12px;
  background-color: #444444;
  color: #fff;
  transition: all 0.25s ease-in-out;

  &:hover {
    opacity: 0.8;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  }

  span {
    font-weight: bold;
  }
`;

const GithubLoginCustomIcon = styled(SiGithub)`
  width: 20px;
  height: 20px;
  margin: auto 14px auto 5px;
  color: #fff;
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
      >
        <GithubLoginCustomIcon />
        Login with&nbsp;<span>GitHub</span>
      </GitHubLoginButton>
    </>
  );
}

export default GithubAuth;
