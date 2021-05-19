import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';

// hook
import useLoginUser from '../hook/useLoginUser';
import useMyPageList from '../hook/useMyPageList';
import { setMyPageList } from '../modules/actions/mypagelistActions';
import { updateMyPageList } from '../modules/actions/mypagelistActions';

// containers
import MyPageListBody from '../containers/mypagelist/MyPageListBody';
import MyPageListHeader from '../containers/mypagelist/MyPageListHeaderer';

// apis
import { closeRoom } from '../api/co-fix';
import { getCommentRoomsInstance } from '../api/mypage/mypageList';

// modal
import Modal from '../containers/Modal';
import AlertModal from '../components/modal/AlertModal';

export default function MyPageList() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const RoomInfos = useMyPageList();
  const user = useLoginUser();
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [propsRoomInfo, setPropsRoomInfo] = useState('');

  const onCloseRoomHandler = (RoomInfo) => {
    setPropsRoomInfo(RoomInfo);
    setIsCloseModalOpen(!isCloseModalOpen);
  };

  const CloseRoom = () => {
    closeRoom(
      propsRoomInfo.roomId,
      () => {
        dispatch(updateMyPageList(propsRoomInfo));
        onCloseRoomHandler();
      },
      (err) => {
        console.error(`이미 닫힌 방인지 확인`, err);
      },
    );
  };
  const gotoBack = () => {
    history.push('/');
  };

  useEffect(() => {
    getCommentRoomsInstance(
      (res) => {
        dispatch(setMyPageList(res.data.data));
      },
      (err) => {
        console.error(`err`, err);
      },
    );
  }, []);

  // 모달 토글 핸들러
  const AlertModalToggleHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  // 새로운 프로젝트 생성
  const onPlusCardClickHandler = () => {
    localStorage.setItem(
      'nickName',
      user.credentials.member && user.credentials.member.name,
    );
    history.push('/create');
  };
  return (
    <>
      <Modal
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={AlertModalToggleHandler}
      >
        <AlertModal
          PropsText="새 Co-Fix를 만드시겠습니까?"
          PropsComfirmHandler={() => onPlusCardClickHandler()}
          PropsRejectHandler={() => AlertModalToggleHandler()}
        />
      </Modal>
      <Modal
        width="fit-content"
        height="320px"
        isModalOpen={isCloseModalOpen}
        ModalToggleHandler={() => onCloseRoomHandler()}
      >
        <AlertModal
          PropsText="정말로 Live Room을 닫으시겠습니까?"
          PropsComfirmHandler={() => CloseRoom()}
          PropsRejectHandler={() => onCloseRoomHandler()}
        />
      </Modal>
      <Background>
        <Prev onClick={gotoBack} />
        <MyPageListWrapper>
          {user.authenticated ? (
            <MyPageListHeader>
              <b>{user.credentials.member.name}</b> 님의 <b>Co-Fix History</b>
            </MyPageListHeader>
          ) : (
            <MyPageListHeader>
              <b>Test User</b> 님의 <b>Co-Fix History</b>
            </MyPageListHeader>
          )}
          <MyPageListBody
            RoomInfos={RoomInfos}
            AlertModalToggleHandler={AlertModalToggleHandler}
            onCloseRoomHandler={onCloseRoomHandler}
          />
        </MyPageListWrapper>
      </Background>
    </>
  );
}

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, #fef9d7, #d299c2);
  /* background-color: #f9f5f4; */
`;
const MyPageListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation-duration: 0.8s;
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
`;

const Prev = styled(FaAngleLeft)`
  font-size: 55px;
  color: #5f5f5f;
  position: absolute;
  top: 2%;
  left: 1%;
  cursor: pointer;
  z-index: 2;
`;
