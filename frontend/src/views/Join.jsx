import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

// container
import Privacy from '../containers/join/Privacy';
import PinCode from '../containers/join/PinCode';
import NickName from '../containers/join/NickName';

// modal components
import Modal from '../containers/Modal';
import AlertModal from '../components/modal/AlertModal';

export default function Join() {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const [nickName, setNickName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isPinCodeAlertModalOpen, setIsPinCodeAlertModalOpen] = useState(false);

  const changePage = () => {
    setCurrent(current + 1);
  };
  const submitForm = () => {
    alert('제출😀');
    history.push('/');
  };

  const nickNameValueSave = (e) => {
    setNickName(e.target.value);
  };

  const pinCodeValueSave = (e) => {
    setPinCode(e.target.value);
  };

  const AlertModalToggleHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };
  const PinCodeAlertModalToggleHandler = () => {
    setIsPinCodeAlertModalOpen(!isPinCodeAlertModalOpen);
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
      <Modal
        isModalOpen={isPinCodeAlertModalOpen}
        ModalToggleHandler={PinCodeAlertModalToggleHandler}
      >
        <AlertModal
          PropsText="8자리의 PIN 번호를 입력해주세요!"
          PropsComfirmHandler={() => PinCodeAlertModalToggleHandler()}
        />
      </Modal>
      <Wrapper>
        {current === 0 ? (
          <Privacy
            onHandleNext={() => {
              changePage();
            }}
          />
        ) : current === 1 ? (
          <PinCode
            value={pinCode}
            onHandleValue={pinCodeValueSave}
            onHandleNext={() => {
              if (pinCode.length === 8) {
                changePage();
              } else {
                PinCodeAlertModalToggleHandler();
              }
            }}
          />
        ) : (
          <NickName
            value={nickName}
            onHandleValue={nickNameValueSave}
            onHandleSubmit={() => {
              if (nickName) {
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
