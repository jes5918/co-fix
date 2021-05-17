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
  const [alertMessage, setAlertMessage] = useState('');

  const changePage = () => {
    setCurrent(current + 1);
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
          history.push(`/co-fix/${res.data.data.roomId}`);
        },
        (err) => {
          console.error('err', err);
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

  const AlertModalToggleHandler = (message) => {
    setAlertMessage(message);
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  return (
    <>
      <Modal
        width="fit-content"
        height="320px"
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={() => AlertModalToggleHandler('')}
      >
        <AlertModal
          PropsText={alertMessage}
          PropsComfirmHandler={() => AlertModalToggleHandler('')}
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
                AlertModalToggleHandler('제목을 입력해주세요');
              }
            }}
          />
        ) : current === 1 ? (
          <MaxParticipant
            value={maxcnt}
            onHandleValue={maxCntValueSave}
            onHandleNext={() => {
              if (maxcnt === 0 || maxcnt > 10) {
                AlertModalToggleHandler(
                  '최대 참가 인원수는 1명 이상 10명 이하 입니다.',
                );
              } else {
                changePage();
              }
            }}
          />
        ) : (
          <UploadText
            value={text}
            onValueChange={textValueSave}
            onHandleSubmit={() => {
              if (text.length > 3000) {
                AlertModalToggleHandler('3000자 이하로 입력해주세요.');
              } else if (text) {
                submitForm();
              } else {
                AlertModalToggleHandler('빈 칸으로 넘어갈 수 없어요!');
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
