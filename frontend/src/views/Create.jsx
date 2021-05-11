import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../containers/makepjt/Title';
import MaxParticipant from '../containers/makepjt/MaxParticipant';
import UploadText from '../containers/makepjt/UploadText';
import Progress from '../containers/makepjt/Progress';
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #fef9d7, #d299c2);
  overflow: hidden;
  justify-content: space-around;
`;
const Prev = styled(FaAngleLeft)`
  font-size: 55px;
  color: #5f5f5f;
  position: absolute;
  top: 20%;
  left: 3%;
  cursor: pointer;
`;
export default function Create() {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [maxcnt, setMaxcnt] = useState('1');
  const [text, setText] = useState('');
  const changePage = () => {
    setCurrent(current + 1);
    console.log('title', title);
    console.log('maxcnt', maxcnt);
  };
  const gotoBack = () => {
    if (current === 0) {
      history.goBack();
    } else {
      setCurrent(current - 1);
    }
  };
  const submitForm = () => {
    alert('제출😀');
    history.push('/');
  };
  const titleValueSave = (e) => {
    setTitle(e.target.value);
  };
  const maxCntValueSave = (e) => {
    setMaxcnt(e.target.value);
  };
  const textValueSave = (e) => {
    setText(e.target.value);
  };

  return (
    <Wrapper>
      <Progress />
      <Prev onClick={gotoBack} />
      {current === 0 ? (
        <Title
          value={title}
          onHandleValue={titleValueSave}
          onHandleNext={() => {
            changePage();
          }}
        />
      ) : current === 1 ? (
        <MaxParticipant
          value={maxcnt}
          onHandleValue={maxCntValueSave}
          onHandleNext={() => {
            changePage();
          }}
        />
      ) : (
        <UploadText
          value={text}
          onValueChange={textValueSave}
          onHandleSubmit={() => {
            submitForm();
          }}
        />
      )}
    </Wrapper>
  );
}
