import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../containers/makepjt/Title';
import MaxParticipant from '../containers/makepjt/MaxParticipant';
import UploadText from '../containers/makepjt/UploadText';
import Progress from '../containers/makepjt/Progress';
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
//api
import { createRoom } from '../api/createRoom';
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
  const [maxcnt, setMaxcnt] = useState(1);
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
    if (title && maxcnt && text) {
      const info = {
        contents: text,
        memberLimit: maxcnt,
        roomTitle: title,
      };
      createRoom(
        info,
        (res) => {
          console.log(`res`, res.data.data);
        },
        (err) => {
          console.error('err', err.response.data);
        },
      );
    } else {
      alert('빈칸인게 있음!!');
    }
  };
  const titleValueSave = (e) => {
    setTitle(e.target.value);
  };
  const maxCntValueSave = (e) => {
    setMaxcnt(Number(e.target.value));
  };
  const textValueSave = (e) => {
    setText(e.target.value);
  };
  const changeCurrent = (e) => {
    if (current !== e) {
      setCurrent(e);
    }
  };

  return (
    <Wrapper>
      <Progress step={current} onHandleCurrent={changeCurrent} />
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
