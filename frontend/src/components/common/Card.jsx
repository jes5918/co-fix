import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

// 이런 형태로 내려옴
const roomInfotest = {
  roomId: '101181c0-0517-40a8-8931-8df5da61623b',
  memberId: 5,
  roomTitle: '한국가스공사',
  memberLimit: 3,
  documentId: 'a39beabe-19cf-49bf-baad-6d383a164716',
  pinNumber: '21423333',
  status: 'OPEN',
  members: [
    {
      nickname: 'J Euisss',
      online: true,
    },
    {
      nickname: 'J Euisss',
      online: true,
    },
    {
      nickname: 'J Euisss',
      online: true,
    },
    {
      nickname: 'J Euisss',
      online: true,
    },
  ],
  createdDate: '2021-05-14T15:06:59.246958',
  lastModifiedDate: '2021-05-14T15:06:59.246958',
};

function Card({
  roomInfo,
  propsWidth,
  propsHeight,
  propsFontSize,
  card,
  onHandleZZim,
  onClickTag,
  onClickImage,
}) {
  return (
    <cardStyle.mainFrame propsWidth={propsWidth} propsHeight={propsHeight}>
      <cardStyle.imgFrame>{roomInfo.roomTitle[0]}</cardStyle.imgFrame>
      <cardStyle.hoverContainer>
        {/* hover */}
        <cardStyle.infoBox onClick={() => onClickImage()}>
          <cardStyle.madeby propsFontSize={propsFontSize}>
            {roomInfo && roomInfo.roomTitle}
          </cardStyle.madeby>
          <cardStyle.madeby propsFontSize={propsFontSize}>
            Created :{' '}
            {roomInfo &&
              roomInfo.createdDate.substring(0, 10).replaceAll('-', '.')}
            <br />
            Modified :{' '}
            {roomInfo &&
              roomInfo.lastModifiedDate.substring(0, 10).replaceAll('-', '.')}
            <br />
            PIN : {roomInfo && roomInfo.pinNumber}
          </cardStyle.madeby>
        </cardStyle.infoBox>
        {/* {test && test.zzim ? (
          <cardStyle.zzimedIcon onClick={() => onHandleZZim()} />
        ) : (
          <cardStyle.zzimIcon onClick={() => onHandleZZim()} />
        )} */}
        <cardStyle.tagBox>
          <cardStyle.tags>
            {roomInfo &&
              roomInfo.members.map((member, i) => {
                return (
                  <cardStyle.tag
                    key={i}
                    onClick={() => onClickTag(member.nickname)}
                    propsFontSize={propsFontSize}
                  >
                    {member.nickname}
                  </cardStyle.tag>
                );
              })}
          </cardStyle.tags>
        </cardStyle.tagBox>
      </cardStyle.hoverContainer>
    </cardStyle.mainFrame>
  );
}
export default Card;

const cardStyle = {
  mainFrame: styled.div`
    width: ${({ propsWidth }) => `${propsWidth ? propsWidth : 300}px`};
    height: ${({ propsHeight }) => `${propsHeight ? propsHeight : 400}px`};
    overflow: hidden;
    position: relative;
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
  imgFrame: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 30px;
    font-family: 'Samlip';
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 30px;
  `,
  hoverContainer: styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
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
    height: 75%;
    margin: 0;
    z-index: 1;
    opacity: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10%;
  `,
  madeby: styled.div`
    color: white;
    z-index: 1;
    opacity: 1;
    font-weight: bold;
    font-size: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize : 17}px`};
    margin-bottom: 15px;
    text-align: center;
    word-break: keep-all;
    line-height: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize + 20 : 27}px`};
  `,
  zzimedIcon: styled(AiFillStar)`
    position: absolute;
    bottom: 28%;
    right: 5%;
    color: rgb(215 164 4);
    font-size: 30px;
  `,
  zzimIcon: styled(AiOutlineStar)`
    position: absolute;
    bottom: 28%;
    right: 5%;
    color: rgb(215 164 4);
    font-size: 30px;
  `,
  tagBox: styled.div`
    width: 100%;
    height: 40%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(256, 256, 256, 0.85);
  `,
  tags: styled.div`
    width: 80%;
    display: flex;
    justify-content: flex-start;
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
};
