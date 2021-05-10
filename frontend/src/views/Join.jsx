import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Privacy from '../containers/join/Privacy';
import PinCode from '../containers/join/PinCode';
import NickName from '../containers/join/NickName';
import { useHistory } from 'react-router';
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #fef9d7, #d299c2);
  overflow: hidden;
  justify-content: space-around;
`;
export default function Join() {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const [nickName, setNickName] = useState('');
  const changePage = () => {
    setCurrent(current + 1);
  };
  const submitForm = () => {
    alert('제출😀');
    history.push('/');
  };
  return (
    <Wrapper>
      {current === 0 ? (
        <Privacy
          onHandleNext={() => {
            changePage();
          }}
        />
      ) : current === 1 ? (
        <PinCode
          onHandleNext={() => {
            changePage();
          }}
        />
      ) : (
        <NickName
          onHandleSubmit={() => {
            submitForm();
          }}
        />
      )}
    </Wrapper>
  );
}
