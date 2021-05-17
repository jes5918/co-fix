import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiSettings3Fill } from 'react-icons/ri';
import { IoMdExit } from 'react-icons/io';

// apis
import { closeRoom, modifyRoom } from '../api/co-fix';

// hooks
import { resetRoomInfo, updateRoomInfo } from '../modules/actions/roomActions';
import { documentGetAction } from '../modules/actions/documentActions';
import useRoomInfo from '../hook/useRoomInfo';
import useLoginUser from '../hook/useLoginUser';

// modal components
import Modal from '../containers/Modal';
import ModifyRoomSettingModal from '../components/modal/ModifyRoomSettingModal';
import AlertModal from '../components/modal/AlertModal';
import BasicButton from '../components/common/BasicButton';

export default function RoomSettingButtonContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const RoomInfo = useRoomInfo();
  const user = useLoginUser();
  const [title, setTitle] = useState(RoomInfo.roomTitle || '데이터 안들어옴');
  const [numParticipant, setNumParticipant] = useState(
    Number(RoomInfo.memberLimit) || 1,
  );

  // 모달창 관련
  const [isModifyRoomSettingModalOpen, setIsModifyRoomSettingModalOpen] =
    useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isPartNumModalOpen, setIsPartNumModalOpen] = useState(false);

  const ModifyRoomSettingModalToggleHandler = () => {
    setIsModifyRoomSettingModalOpen(!isModifyRoomSettingModalOpen);
  };

  const ModifyRoomSettingHandler = () => {
    const originNum = Number(RoomInfo.memberLimit);
    if (originNum > numParticipant) {
      ParticipantNumModalToggleHandler();
    } else {
      modifyRoom(
        RoomInfo.roomId,
        numParticipant,
        title,
        (res) => {
          const data = {
            roomId: RoomInfo.roomId,
            title: title,
            maxcnt: numParticipant,
          };
          dispatch(updateRoomInfo(data));
          setIsModifyRoomSettingModalOpen(!isModifyRoomSettingModalOpen);
        },
        (err) => {
          console.log(`이미 닫힌 방인지 확인`, err);
        },
      );
    }
  };

  const AlertModalToggleHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  const ParticipantOutToggleHandler = () => {
    setIsParticipantModalOpen(!isParticipantModalOpen);
  };

  const ParticipantNumModalToggleHandler = () => {
    setIsPartNumModalOpen(!isPartNumModalOpen);
  };

  const CloseRoomHandler = () => {
    closeRoom(
      RoomInfo.roomId,
      (res) => {
        console.log(`res`, res);
        dispatch(resetRoomInfo());
        dispatch(documentGetAction([]));
        history.push('/');
      },
      (err) => {
        console.log(`이미 닫힌 방인지 확인`, err);
      },
    );
  };

  const OutRoomHandler = () => {
    // 진우야 여기 소켓 아웃하자
    history.push('/');
  };
  return (
    <>
      <B.container>
        {user.authenticated &&
        RoomInfo.memberId === user.credentials.memberId ? (
          <>
            <B.button>?</B.button>
            <B.button>!</B.button>
            <B.button onClick={ModifyRoomSettingModalToggleHandler}>
              <B.settingIcon />
            </B.button>
            <BasicButton
              width={150}
              height={50}
              fontSize={18}
              color={'white'}
              backgroundColor={'#CF0101'}
              onClickHandler={AlertModalToggleHandler}
              text="Co-Fix 종료"
            ></BasicButton>
          </>
        ) : (
          <>
            <B.button>?</B.button>
            <B.button>!</B.button>
            <BasicButton
              width={150}
              height={50}
              fontSize={18}
              color={'#ffffff'}
              backgroundColor={'#CF0101'}
              onClickHandler={ParticipantOutToggleHandler}
            >
              <B.exitIcon color={'#ffffff'} />
            </BasicButton>
          </>
        )}
      </B.container>
      <Modal
        width="fit-content"
        height="fit-content"
        isModalOpen={isModifyRoomSettingModalOpen}
        ModalToggleHandler={ModifyRoomSettingModalToggleHandler}
      >
        <ModifyRoomSettingModal
          PropsComfirmHandler={ModifyRoomSettingHandler}
          setTitle={setTitle}
          setNumParticipant={setNumParticipant}
          title={title}
          numParticipant={numParticipant}
        />
      </Modal>
      <Modal
        width="500px"
        height="320px"
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={AlertModalToggleHandler}
      >
        <AlertModal
          PropsText="정말 방을 닫으시겠습니까?"
          PropsComfirmHandler={CloseRoomHandler}
          PropsRejectHandler={AlertModalToggleHandler}
        />
      </Modal>
      <Modal
        width="500px"
        height="320px"
        isModalOpen={isParticipantModalOpen}
        ModalToggleHandler={ParticipantOutToggleHandler}
      >
        <AlertModal
          PropsText="정말 방을 나가시겠습니까?"
          PropsComfirmHandler={OutRoomHandler}
          PropsRejectHandler={ParticipantOutToggleHandler}
        />
      </Modal>
      <Modal
        width="500px"
        height="320px"
        isModalOpen={isPartNumModalOpen}
        ModalToggleHandler={ParticipantNumModalToggleHandler}
      >
        <AlertModal
          PropsText="원래 인원 수 보다 줄일 수 없어요"
          PropsComfirmHandler={ParticipantNumModalToggleHandler}
        />
      </Modal>
    </>
  );
}

const B = {
  container: styled.div`
    /* position: absolute; */
    /* right: 250px; */
    /* width: 350px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  button: styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    font-family: 'S-CoreDream-6Bold';
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
  settingIcon: styled(RiSettings3Fill)`
    width: 33px;
    height: 33px;
    color: #6e5e5e;
  `,
  exitIcon: styled(IoMdExit)`
    width: 33px;
    height: 33px;
    font-weight: bold;
    color: #6e5e5e;
  `,
};
