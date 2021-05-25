import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';

// api and redux
import { saveRoomInfo } from '../modules/actions/roomActions';
import { commentResetAction } from '../modules/actions/commentActions';
import { getRoomInfo, enterRoom } from '../api/co-fix';

// container
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

  const gotoBack = () => {
    if (current === 0) {
      history.goBack();
    } else {
      setCurrent(current - 1);
    }
  };

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
        if (res.data.data.status === 'CLOSED') {
          AlertModalToggleHandler('종료된 첨삭방입니다.');
          setPinCode('');
        } else {
          setCurrent(current + 1);
        }
      },
      (err) => {
        if (err.response.data.message === '존재하지 않는 첨삭방') {
          AlertModalToggleHandler('존재하지 않는 첨삭방 입니다.');
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
          dispatch(commentResetAction());
          localStorage.setItem('nickName', nickName);
          history.push(`/co-fix/${data.roomId}`);
        },
        (err) => {
          if (err.response.data.message === '현재 방이 가득 참') {
            AlertModalToggleHandler('참여 가능 인원이 다 찼습니다.');
          }
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
          AlertModalToggleHandler('유효한 Pin Code가 아닙니다.');
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
        <Prev onClick={gotoBack} />
        {current === 0 ? (
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
  background: linear-gradient(to top, #fef9d7, #d299c2);
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
