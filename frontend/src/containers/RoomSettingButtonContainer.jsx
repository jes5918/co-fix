import React, { useState } from 'react';
import styled from 'styled-components';

// apis
import { closeRoom } from '../api/co-fix';

// hooks
import useRoomInfo from '../hook/useRoomInfo';

// modal components
import Modal from '../containers/Modal';
import ModifyRoomSettingModal from '../components/modal/ModifyRoomSettingModal';
import AlertModal from '../components/modal/AlertModal';

export default function RoomSettingButtonContainer() {
  const RoomInfo = useRoomInfo();
  // 모달창 관련
  const [
    isModifyRoomSettingModalOpen,
    setIsModifyRoomSettingModalOpen,
  ] = useState(true);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const ModifyRoomSettingModalToggleHandler = () => {
    setIsModifyRoomSettingModalOpen(!isModifyRoomSettingModalOpen);
  };
  const AlertModalToggleHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  const CloseRoomHandler = () => {
    console.log('첨삭방 닫기');
    // closeRoom(
    //   RoomInfo.roomId,
    //   (res) => {
    //     console.log(`res`, res);
    //   },
    //   (err) => {
    //     console.log(`err`, err);
    //   },
    // );
  };
  return (
    <>
      <Modal
        width="fit-content"
        height="fit-content"
        isModalOpen={isModifyRoomSettingModalOpen}
        ModalToggleHandler={ModifyRoomSettingModalToggleHandler}
      >
        <ModifyRoomSettingModal
          RoomInfo={RoomInfo}
          PropsComfirmHandler={CloseRoomHandler}
          PropsRejectHandler={ModifyRoomSettingModalToggleHandler}
        />
      </Modal>
      <Modal
        width="500px"
        height="320px"
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={AlertModalToggleHandler}
      >
        <AlertModal
          PropsText="첨삭방을 정말 닫으시겠습니까?"
          PropsComfirmHandler={CloseRoomHandler}
          PropsRejectHandler={AlertModalToggleHandler}
        />
      </Modal>
      <B.container>
        <B.button onClick={ModifyRoomSettingModalToggleHandler}>셋팅</B.button>
        <B.button onClick={AlertModalToggleHandler}>나가기</B.button>
      </B.container>
    </>
  );
}

const B = {
  container: styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.3);
  `,
  button: styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    font-family: 'SCD_bold';
    font-size: 20px;
    color: #020236;
    font-weight: bold;
    border-radius: 50%;
    box-shadow: 2px 2px 4px 2px #bebebe;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    background: linear-gradient(to bottom, #fef9d7, #d299c2);
    &:hover {
      background: linear-gradient(to bottom, #f3edb6, #d28cc2);
    }
    animation-duration: 1s;
    animation-name: fadeInUp;
    @keyframes fadeInUp {
      from {
        transform: translate3d(0, 50px, 0);
        opacity: 0;
      }

      to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
    }
  `,
};
