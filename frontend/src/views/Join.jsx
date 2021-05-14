import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { saveRoomInfo, resetRoomInfo } from '../modules/actions/roomActions';
import {
  createRoom,
  getRoomInfo,
  enterRoom,
  closeRoom,
  modifyRoom,
} from '../api/co-fix';

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
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isPinCodeAlertModalOpen, setIsPinCodeAlertModalOpen] = useState(false);
  const [isNickNameAlertModalOpen, setisNickNameAlertModalOpen] = useState(
    false,
  );
  const [
    isValidPincodeAlertModalOpen,
    setisValidPincodeAlertModalOpen,
  ] = useState(false);

  const changePage = () => {
    setCurrent(current + 1);
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
  const ValidPincodeAlertModalToggleHandler = () => {
    setisValidPincodeAlertModalOpen(!isValidPincodeAlertModalOpen);
  };
  const NickNameAlertModalToggleHandler = () => {
    setisNickNameAlertModalOpen(!isNickNameAlertModalOpen);
  };

  const validRoom = () => {
    getRoomInfo(
      pinCode,
      (res) => {
        console.log(res.data);
        setCurrent(current + 1);
      },
      (err) => {
        if (err.response.data.message === '존재하지 않는 첨삭방') {
          console.error(err.response.data);
          ValidPincodeAlertModalToggleHandler();
        }
      },
    );
  };
  const duplicatedNickName = (data) => {
    const dupli = data.members.map((member) => {
      if (member.nickname === nickName && member.online) {
        NickNameAlertModalToggleHandler();
        return;
      } else {
        //join api작성.
        enterRoom(
          pinCode,
          nickName,
          (res) => {
            localStorage.setItem('nickName', nickName);
            history.push(`/co-fix/${data.roomId}`);
          },
          (err) => {
            console.log(`err`, err);
          },
        );
      }
    });
  };
  const validNickName = () => {
    getRoomInfo(
      pinCode,
      (res) => {
        console.log(res.data);
        dispatch(saveRoomInfo(res.data.data));
        duplicatedNickName(res.data.data);
      },
      (err) => {
        if (err.response.data.message === '존재하지 않는 첨삭방') {
          console.error(err.response.data);
          ValidPincodeAlertModalToggleHandler();
        }
      },
    );
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
      <Modal
        isModalOpen={isValidPincodeAlertModalOpen}
        ModalToggleHandler={ValidPincodeAlertModalToggleHandler}
      >
        <AlertModal
          PropsText="유효한 Pin Code가 아닙니다."
          PropsComfirmHandler={() => ValidPincodeAlertModalToggleHandler()}
        />
      </Modal>
      <Modal
        isModalOpen={isNickNameAlertModalOpen}
        ModalToggleHandler={NickNameAlertModalToggleHandler}
      >
        <AlertModal
          PropsText="이미 존재하는 닉네임입니다."
          PropsComfirmHandler={() => NickNameAlertModalToggleHandler()}
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
                validRoom();
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
                validNickName();
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
