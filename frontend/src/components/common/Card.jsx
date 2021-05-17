import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeRoom } from '../../api/co-fix';
import { updateMyPageList } from '../../modules/actions/mypagelistActions';

// modal component
import Modal from '../../containers/Modal';
import AlertModal from '../../components/modal/AlertModal';

// 이런 형태로 내려옴
// const roomInfotest = {
//   roomId: '101181c0-0517-40a8-8931-8df5da61623b',
//   memberId: 5,
//   roomTitle: '한국가스공사',
//   memberLimit: 3,
//   documentId: 'a39beabe-19cf-49bf-baad-6d383a164716',
//   pinNumber: '21423333',
//   status: 'OPEN',
//   members: [
//     {
//       nickname: 'J Euisss',
//       online: true,
//     },
//     {
//       nickname: 'J Euisss',
//       online: true,
//     },
//     {
//       nickname: 'J Euisss',
//       online: true,
//     },
//     {
//       nickname: 'J Euisss',
//       online: true,
//     },
//   ],
//   createdDate: '2021-05-14T15:06:59.246958',
//   lastModifiedDate: '2021-05-14T15:06:59.246958',
// };

function Card({
  RoomInfo,
  propsWidth,
  propsHeight,
  propsFontSize,
  onGotoMyPageHandler,
  onGotoLiveHandler,
}) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const dispatch = useDispatch();
  const onCloseRoomHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  const CloseRoom = () => {
    closeRoom(
      RoomInfo.roomId,
      (res) => {
        console.log(`res`, res);
        dispatch(updateMyPageList(RoomInfo));
        onCloseRoomHandler();
      },
      (err) => {
        console.log(`이미 닫힌 방인지 확인`, err);
      },
    );
  };

  return (
    <>
      <Modal
        width="fit-content"
        height="320px"
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={() => onCloseRoomHandler()}
      >
        <AlertModal
          PropsText="정말로 Live Room을 닫으시겠습니까?"
          PropsComfirmHandler={() => CloseRoom()}
          PropsRejectHandler={() => onCloseRoomHandler()}
        />
      </Modal>
      <Container>
        {RoomInfo.status === 'CLOSED' ? (
          <CloseButton>CLOSED</CloseButton>
        ) : null}
        <cardStyle.mainFrame propsWidth={propsWidth} propsHeight={propsHeight}>
          <cardStyle.frontpannel>
            <cardStyle.title propsFontSize={propsFontSize}>
              {RoomInfo && RoomInfo.roomTitle}
            </cardStyle.title>
            <cardStyle.tagBox>
              <cardStyle.tags>
                {RoomInfo &&
                  RoomInfo.members.map((member, i) => {
                    return (
                      <cardStyle.tag key={i} propsFontSize={propsFontSize}>
                        {member.nickname}
                      </cardStyle.tag>
                    );
                  })}
              </cardStyle.tags>
            </cardStyle.tagBox>
          </cardStyle.frontpannel>
          <cardStyle.hoverContainer>
            <cardStyle.infoBox>
              <cardStyle.madeby propsFontSize={propsFontSize}>
                Created :{' '}
                {RoomInfo &&
                  RoomInfo.createdDate.substring(0, 10).replaceAll('-', '.')}
              </cardStyle.madeby>
              <cardStyle.madeby>
                Modified :{' '}
                {RoomInfo &&
                  RoomInfo.lastModifiedDate
                    .substring(0, 10)
                    .replaceAll('-', '.')}
              </cardStyle.madeby>
              <cardStyle.madeby>
                Status : {RoomInfo && RoomInfo.status}
              </cardStyle.madeby>
              <cardStyle.madeby>
                PIN : {RoomInfo && RoomInfo.pinNumber}
              </cardStyle.madeby>
              <cardStyle.buttonwrapper>
                {RoomInfo.status === 'OPEN' ? (
                  <>
                    <cardStyle.button enter onClick={() => onGotoLiveHandler()}>
                      Enter Live Room
                    </cardStyle.button>
                    <cardStyle.button onClick={() => onCloseRoomHandler()}>
                      Close Live Room
                    </cardStyle.button>
                  </>
                ) : (
                  <cardStyle.button enter onClick={() => onGotoMyPageHandler()}>
                    Enter Result Room
                  </cardStyle.button>
                )}
              </cardStyle.buttonwrapper>
            </cardStyle.infoBox>
          </cardStyle.hoverContainer>
        </cardStyle.mainFrame>
      </Container>
    </>
  );
}
export default Card;

const Container = styled.div`
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 2;
  transform: rotate(30deg);
  color: #555;
  font-size: 2rem;
  font-weight: 700;
  border: 0.25rem solid #555;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  border-radius: 1rem;
  font-family: 'Courier';
  mix-blend-mode: multiply;
  color: #0a9928;
  border: 0.5rem solid #0a9928;
  border-radius: 0;
  transform: rotate(-20deg);
  -webkit-mask-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png');
  -webkit-mask-size: 944px 604px;
  -webkit-mask-position: 13rem 6rem;
`;

const cardStyle = {
  mainFrame: styled.div`
    position: relative;
    width: ${({ propsWidth }) => `${propsWidth ? propsWidth : 300}px`};
    height: ${({ propsHeight }) => `${propsHeight ? propsHeight : 400}px`};
    overflow: hidden;
    position: relative;
    background-color: #ffffff;
    border-radius: 30px;
    margin: 10px 25px;
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    &:hover * {
      top: 0px;
      opacity: 1;
    }
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.5) 0px 20px 60px;
      transform: scale(1.1);
    }
  `,
  frontpannel: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 30px;
    font-family: 'Samlip';
    padding: 20px 20px;
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 30px;
  `,
  hoverContainer: styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #fef9d7, #fec9d7);
    position: absolute;
    top: 20%;
    z-index: 1;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
    border-radius: 30px;
  `,
  infoBox: styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    z-index: 1;
    opacity: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10%;
  `,
  madeby: styled.div`
    z-index: 1;
    opacity: 1;
    font-weight: bold;
    font-size: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize : 17}px`};
    margin-bottom: 10px;
    text-align: center;
    word-break: keep-all;
    line-height: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize + 20 : 27}px`};
  `,
  title: styled.div`
    z-index: 1;
    opacity: 1;
    font-weight: bold;
    font-size: 24px;
    margin-top: 30px;
    text-align: center;
    word-break: keep-all;
    line-height: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize + 20 : 27}px`};
  `,
  tagBox: styled.div`
    width: 100%;
    height: 50%;
    margin: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.1);
  `,
  tags: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    word-break: keep-all;
  `,
  tag: styled.span`
    font-size: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize : 17}px`};
    color: #262626;
    font-weight: bold;
    text-align: center;
    font-family: 'NotoSans';
    line-height: 20px;
    word-break: keep-all;
    margin-right: 5px;
  `,
  buttonwrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
  `,
  button: styled.div`
    margin: 5px 10px 5px;
    padding: 10px 20px;
    border: ${({ enter }) =>
      enter ? '2px solid #addd8c' : '2px solid #e66b53'};
    border-radius: 10px;
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    &:hover {
      background-color: ${({ enter }) => (enter ? '#addd8c' : '#e66b53')};
    }
  `,
};
