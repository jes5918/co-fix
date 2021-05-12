import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { saveRoomInfo, resetRoomInfo } from '../modules/actions/roomActions';
import { documentGetAction } from '../modules/actions/documentActions';

// container
import Title from '../containers/makepjt/Title';
import MaxParticipant from '../containers/makepjt/MaxParticipant';
import UploadText from '../containers/makepjt/UploadText';
import Progress from '../containers/makepjt/Progress';

// icons
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';

//api
import { createRoom, getRoomInfo, closeRoom } from '../api/co-fix';
import { getDocuments } from '../api/documents';

// modal component
import Modal from '../containers/Modal';
import AlertModal from '../components/modal/AlertModal';

export default function Create() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState('');
  const [maxcnt, setMaxcnt] = useState(1);
  const [text, setText] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

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
          dispatch(saveRoomInfo(res.data.data));
          // documentId로 조회
          getDocuments(
            res.data.data.documentId,
            (response) => {
              console.log(`response`, response);
              dispatch(documentGetAction(response.data.data));
              history.push(`/co-fix/${res.data.data.roomId}`);
            },
            (error) => {
              console.log(`error`, error);
            },
          );
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

  const AlertModalToggleHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  return (
    <>
      <Modal
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={AlertModalToggleHandler}
      >
        <AlertModal
          PropsText="빈 칸으로 넘어갈 수 없어요!"
          PropsComfirmHandler={() => AlertModalToggleHandler()}
        />
      </Modal>
      <Wrapper>
        <Progress step={current} />
        <Prev onClick={gotoBack} />
        {current === 0 ? (
          <Title
            value={title}
            onHandleValue={titleValueSave}
            onHandleNext={() => {
              if (title) {
                changePage();
              } else {
                AlertModalToggleHandler();
              }
            }}
          />
        ) : current === 1 ? (
          <MaxParticipant
            value={maxcnt}
            onHandleValue={maxCntValueSave}
            onHandleNext={() => {
              if (maxcnt >= 1) {
                changePage();
              } else {
                AlertModalToggleHandler();
              }
            }}
          />
        ) : (
          <UploadText
            value={text}
            onValueChange={textValueSave}
            onHandleSubmit={() => {
              if (text) {
                submitForm();
              } else {
                AlertModalToggleHandler();
              }
            }}
          />
        )}
      </Wrapper>
    </>
  );
}

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
