import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { CgMathPlus } from 'react-icons/cg';

// components
import Card from '../../components/common/Card';
import Modal from '../Modal';
import ModalContent from '../../components/template/ModalContent';
import AlertModal from '../../components/modal/AlertModal';

const TempCard = {
  zzim: false,
  pk: 1,
  madeby: '의수',
  createdAt: '2020. 04. 26',
  tags: ['React', 'Redux', 'Frontend'],
};

export default function TemplateBody({ roomInfos }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const history = useHistory();

  const onZZimToggleHandler = () => {
    console.log('찜클릭');
  };

  const onTagClickHandler = (tag) => {
    console.log(`${tag}`, '태그클릭');
  };

  const ModalToggleHandler = (roomInfo) => {
    setIsModalOpen(!isModalOpen);
    history.push(`/mypage/${roomInfo.roomId}/${roomInfo.documentId}`);
  };
  const AlertModalToggleHandler = () => {
    setIsAlertModalOpen(!isAlertModalOpen);
  };

  const onPlusCardClickHandler = () => {
    history.push('/create');
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} ModalToggleHandler={ModalToggleHandler}>
        <ModalContent
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onClickTag={onTagClickHandler}
        />
      </Modal>
      <Modal
        isModalOpen={isAlertModalOpen}
        ModalToggleHandler={AlertModalToggleHandler}
      >
        <AlertModal
          PropsText="새 첨삭 프로젝트를 만드시겠습니까?"
          PropsComfirmHandler={() => onPlusCardClickHandler()}
          PropsRejectHandler={() => AlertModalToggleHandler()}
        />
      </Modal>
      <CardWrapper>
        {roomInfos &&
          roomInfos.map((roomInfo, idx) => {
            console.log(`roomInfo`, roomInfo);
            return (
              <Card
                key={idx}
                roomInfo={roomInfo}
                thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
                card={TempCard}
                onHandleZZim={onZZimToggleHandler}
                onClickTag={onTagClickHandler}
                propsWidth={280}
                propsHeight={330}
                propsFontSize={18}
                onClickImage={() => ModalToggleHandler(roomInfo)}
              />
            );
          })}
        <PlusCard.Wrapper onClick={AlertModalToggleHandler}>
          <PlusCard.InnerContainer>
            <PlusCard.Icon />
          </PlusCard.InnerContainer>
        </PlusCard.Wrapper>
      </CardWrapper>
    </>
  );
}

const CardWrapper = styled.div`
  width: 87%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
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
    margin: 10px 25px;
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
