import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';

// icon
import { CgMathPlus } from 'react-icons/cg';

// components
import Card from '../../components/common/Card';
import Modal from '../Modal';
import AlertModal from '../../components/modal/AlertModal';

// redux
import { saveRoomInfo } from '../../modules/actions/roomActions';
import { commentResetAction } from '../../modules/actions/commentActions';
import useLoginUser from '../../hook/useLoginUser';
import { enterRoom } from '../../api/co-fix';

export default function TemplateBody({
  RoomInfos,
  AlertModalToggleHandler,
  onCloseRoomHandler,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useLoginUser();

  // 마이페이지 가는 핸들러
  const GoToMyPageHandler = (RoomInfo) => {
    dispatch(saveRoomInfo(RoomInfo));
    history.push(`/mypage/${RoomInfo.roomId}/${RoomInfo.documentId}`);
  };

  // 라이브 방 가는 핸들러
  const onGotoLiveHandler = (RoomInfo) => {
    enterRoom(
      RoomInfo.pinNumber,
      user.credentials.member && user.credentials.member.name,
      (res) => {
        dispatch(saveRoomInfo(RoomInfo));
        dispatch(commentResetAction());
        localStorage.setItem(
          'nickName',
          user.credentials.member && user.credentials.member.name,
        );
        history.push(`/co-fix/${RoomInfo.roomId}`);
      },
      () => {},
    );
  };

  return (
    <>
      <Scrollbars
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <CardWrapper>
          <PlusCard.Wrapper onClick={AlertModalToggleHandler}>
            <PlusCard.InnerContainer>
              <PlusCard.Icon />
            </PlusCard.InnerContainer>
          </PlusCard.Wrapper>
          {RoomInfos.length > 0 &&
            RoomInfos.map((RoomInfo, idx) => {
              return (
                <Card
                  key={idx}
                  RoomInfo={RoomInfo}
                  propsWidth={280}
                  propsHeight={330}
                  propsFontSize={18}
                  onGotoMyPageHandler={() => GoToMyPageHandler(RoomInfo)}
                  onGotoLiveHandler={() => onGotoLiveHandler(RoomInfo)}
                  onCloseRoomHandler={onCloseRoomHandler}
                />
              );
            })}
        </CardWrapper>
      </Scrollbars>
    </>
  );
}

const CardWrapper = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
`;

const PlusCard = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 330px;
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    margin: 20px 25px;
    background: linear-gradient(to bottom, #fef9d7, #d299c2);
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.5) 0px 20px 60px;
      transform: scale(1.1);
    }
  `,
  InnerContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 27px;
    background-color: white;
  `,
  Icon: styled(CgMathPlus)`
    width: 100px;
    height: 100px;
    color: #949494;
    background-color: linear-gradient(to bottom, #fef9d7, #d299c2);
  `,
};
