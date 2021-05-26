import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// library
import GitHubLogin from 'react-github-login';

// icons
import { SiGithub } from 'react-icons/si';

// api instance
import { githubLoginInstance } from '../../api/accounts/login';

// redux
import { useDispatch } from 'react-redux';
import { LoginAction } from '../../modules/actions/userActions';

export default function GithubAuth({ ModalToggleHandler, setFlag, flag }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSuccess = ({ code }) => {
    githubLoginInstance(
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
  const onFailure = (response) => {
    console.error('Github Login Error', response);
  };

  return (
    <>
      <GitHubLoginButton
        clientId={process.env.REACT_APP_GITHUB_APP_CLIENT_ID}
        redirectUri=""
        onSuccess={onSuccess}
        onFailure={onFailure}
        scope="user:email"
      >
        <GithubLoginCustomIcon />
        Login with&nbsp;<span>GitHub</span>
      </GitHubLoginButton>
    </>
  );
}

const GitHubLoginButton = styled(GitHubLogin)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 55px;
  margin: 10px auto 5px;
  border: none;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  font-size: 18px;
  background-color: #444444;
  color: #fff;
  transition: all 0.25s ease-in-out;

  &:hover {
    opacity: 0.8;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
  }

  span {
    font-weight: bold;
  }
`;

const GithubLoginCustomIcon = styled(SiGithub)`
  width: 30px;
  height: 30px;
  margin: auto 14px auto 5px;
  color: #fff;
`;
