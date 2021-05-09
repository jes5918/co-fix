import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../containers/makepjt/Title';
import MaxParticipant from '../containers/makepjt/MaxParticipant';
import UploadText from '../containers/makepjt/UploadText';
import { useHistory } from 'react-router';
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #fef9d7, #d299c2);
  overflow: hidden;
  justify-content: space-around;
`;
export default function CreatePJT() {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const [title, setTitle] = useState('');
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
        <Title
          onHandleNext={() => {
            changePage();
          }}
        />
      ) : current === 1 ? (
        <MaxParticipant
          onHandleNext={() => {
            changePage();
          }}
        />
      ) : (
        <UploadText
          onHandleSubmit={() => {
            submitForm();
          }}
        />
      )}
    </Wrapper>
  );
}
