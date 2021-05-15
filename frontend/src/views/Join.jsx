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
  const history = useHistory();
  const dispatch = useDispatch();

  // pagenation
  const [current, setCurrent] = useState(0);

  // Input 관련
  const [nickName, setNickName] = useState('');
  const [pinCode, setPinCode] = useState('');

  // 모달창 관련
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const changePage = () => {
    setCurrent(current + 1);
  };

  const nickNameValueSave = (e) => {
    setNickName(e.target.value);
  };

  const pinCodeValueSave = (e) => {
    setPinCode(e.target.value);
  };

  const AlertModalToggleHandler = (message) => {
    setAlertMessage(message);
    setIsAlertModalOpen(!isAlertModalOpen);
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
          AlertModalToggleHandler('존재하지 않는 첨삭방');
        }
      },
    );
  };

  const duplicatedNickName = async (data) => {
    const isduplicated = await data.members.some((member) => {
      if (member.nickname === nickName && member.online) {
        AlertModalToggleHandler('이미 존재하는 닉네임입니다.');
        return true;
      }
    });

    if (!isduplicated) {
      enterRoom(
        pinCode,
        nickName,
        (res) => {
          dispatch(saveRoomInfo(res.data.data));
          localStorage.setItem('nickName', nickName);
          history.push(`/co-fix/${data.roomId}`);
        },
        (err) => {
          AlertModalToggleHandler('서버 에러 발생');
        },
      );
    }
  };

  const validNickName = () => {
    getRoomInfo(
      pinCode,
      (res) => {
        duplicatedNickName(res.data.data);
      },
      (err) => {
        if (err.response.data.message === '존재하지 않는 첨삭방') {
          AlertModalToggleHandler('존재하지 않는 첨삭방');
        }
      },
    );
  };

  return (
    <>
      <Modal
        width="500px"
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
                AlertModalToggleHandler('8자리의 PIN 번호를 입력해주세요!');
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
                AlertModalToggleHandler('닉네임을 입력해주세요!');
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
