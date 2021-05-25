import React, { useState } from 'react';
import styled from 'styled-components';

//redux
import { useDispatch } from 'react-redux';
import { saveRoomInfo } from '../modules/actions/roomActions';
import { logoutUserAction } from '../modules/actions/userActions';

// container
import Title from '../containers/makepjt/Title';
import MaxParticipant from '../containers/makepjt/MaxParticipant';
import UploadText from '../containers/makepjt/UploadText';
import Progress from '../containers/makepjt/Progress';

// icons
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';

//api
import { createRoom } from '../api/co-fix';

//hooks
import useLoginUser from '../hook/useLoginUser';

// modal component
import Modal from '../containers/Modal';
import AlertModal from '../components/modal/AlertModal';

export default function Create() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useLoginUser();
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState('');
  const [maxcnt, setMaxcnt] = useState(2);
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
      if (user.credentials.member) {
        createRoom(
          info,
          (res) => {
            dispatch(saveRoomInfo(res.data.data));
            localStorage.setItem('nickName', user.credentials.member.name);
            history.push(`/co-fix/${res.data.data.roomId}`);
          },
          () => {},
        );
      } else {
        AlertModalToggleHandler(
          '로그인이 만료되었습니다. 다시 로그인 해주세요.',
        );
        setTimeout(() => {
          dispatch(logoutUserAction);
        }, 3000);
      }
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
