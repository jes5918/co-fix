import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeRoom } from '../../api/co-fix';
import { updateMyPageList } from '../../modules/actions/mypagelistActions';
import DoneIcon from '../../assets/done.png';
import CloseIcon from '../../assets/ing.png';

// modal component
import Modal from '../../containers/Modal';
import AlertModal from '../../components/modal/AlertModal';

export default function Card({
  RoomInfo,
  propsWidth,
  propsHeight,
  propsFontSize,
  onGotoMyPageHandler,
  onGotoLiveHandler,
  onCloseRoomHandler,
}) {
  return (
    <>
      <Container>
        <cardStyle.mainFrame propsWidth={propsWidth} propsHeight={propsHeight}>
          <cardStyle.frontpannel>
            {RoomInfo.status === 'CLOSED' ? (
              <cardStyle.OpenIcon />
            ) : (
              <cardStyle.CloseIcon />
            )}
            <cardStyle.title propsFontSize={propsFontSize}>
              {RoomInfo && RoomInfo.roomTitle}
            </cardStyle.title>
          </cardStyle.frontpannel>
          <cardStyle.hoverContainer>
            <cardStyle.infoBox>
              <cardStyle.madeby>
                만든 날짜 :{' '}
                {RoomInfo &&
                  RoomInfo.createdDate.substring(0, 10).replaceAll('-', '.')}
              </cardStyle.madeby>
              <cardStyle.madeby>
                마지막 수정 :{' '}
                {RoomInfo &&
                  RoomInfo.lastModifiedDate
                    .substring(0, 10)
                    .replaceAll('-', '.')}
              </cardStyle.madeby>
              <cardStyle.madeby>
                상태 : {RoomInfo && RoomInfo.status}
              </cardStyle.madeby>
              <cardStyle.madeby>
                PIN : {RoomInfo && RoomInfo.pinNumber}
              </cardStyle.madeby>
            </cardStyle.infoBox>
            <cardStyle.buttonwrapper>
              {RoomInfo.status === 'OPEN' ? (
                <>
                  <cardStyle.button enter onClick={() => onGotoLiveHandler()}>
                    ENTER
                  </cardStyle.button>
                  <cardStyle.button
                    onClick={() => onCloseRoomHandler(RoomInfo)}
                  >
                    CLOSE
                  </cardStyle.button>
                </>
              ) : (
                <cardStyle.button enter onClick={() => onGotoMyPageHandler()}>
                  CO-FIX 결과
                </cardStyle.button>
              )}
            </cardStyle.buttonwrapper>
          </cardStyle.hoverContainer>
        </cardStyle.mainFrame>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  margin: 20px 5px;
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
    justify-content: center;
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
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    position: absolute;
    font-family: 'S-CoreDream-6Bold';
    font-weight: 300;
    font-size: 1.2rem;
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
    height: 65%;
    margin: 0;
    z-index: 1;
    opacity: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25% 10% 5%;
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
    /* border-radius: 10px;
    padding: 5px 10px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.2); */
  `,
  title: styled.div`
    z-index: 1;
    opacity: 1;
    font-weight: bold;
    font-size: 22px;
    margin-top: 20px;
    text-align: center;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize + 20 : 27}px`};
  `,
  buttonwrapper: styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 20%;
    justify-content: space-evenly;
    align-items: center;
  `,
  button: styled.div`
    margin: 5px 10px 5px;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: ${({ enter }) => (enter ? '#c39393' : '#e66b53')};
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    color: #ffffff;
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    &:hover {
      box-shadow: 3px 3px 12px 3px rgba(0, 0, 0, 0.2);
      background-color: ${({ enter }) => (enter ? '#b37f7f' : '#d84e33')};
    }
  `,
  OpenIcon: styled.img.attrs({ src: DoneIcon })`
    width: 150px;
    height: auto;
  `,
  CloseIcon: styled.img.attrs({ src: CloseIcon })`
    width: 150px;
    height: auto;
  `,
};
