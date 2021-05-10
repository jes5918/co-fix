import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { CgMathPlus } from 'react-icons/cg';

// components
import Card from '../../components/common/Card';
import Modal from '../Modal';
import ModalContent from '../../components/template/ModalContent';

const TempCard = {
  zzim: false,
  pk: 1,
  madeby: '의수',
  createdAt: '2020. 04. 26',
  tags: ['React', 'Redux', 'Frontend'],
};

export default function TemplateBody() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const onZZimToggleHandler = () => {
    console.log('찜클릭');
  };

  const onTagClickHandler = (tag) => {
    console.log(`${tag}`, '태그클릭');
  };

  const ModalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
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
      <CardWrapper>
        <Card
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onHandleZZim={onZZimToggleHandler}
          onClickTag={onTagClickHandler}
          propsWidth={280}
          propsHeight={350}
          propsFontSize={18}
          onClickImage={ModalToggleHandler}
        />
        <Card
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onHandleZZim={onZZimToggleHandler}
          onClickTag={onTagClickHandler}
          propsWidth={280}
          propsHeight={350}
          propsFontSize={18}
          onClickImage={ModalToggleHandler}
        />
        <Card
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onHandleZZim={onZZimToggleHandler}
          onClickTag={onTagClickHandler}
          propsWidth={280}
          propsHeight={350}
          propsFontSize={18}
          onClickImage={ModalToggleHandler}
        />
        <Card
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onHandleZZim={onZZimToggleHandler}
          onClickTag={onTagClickHandler}
          propsWidth={280}
          propsHeight={350}
          propsFontSize={18}
          onClickImage={ModalToggleHandler}
        />
        <Card
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onHandleZZim={onZZimToggleHandler}
          onClickTag={onTagClickHandler}
          propsWidth={280}
          propsHeight={350}
          propsFontSize={18}
          onClickImage={ModalToggleHandler}
        />
        <Card
          thumbnailURL="https://imgscf.slidemembers.com/docs/1/1/101/portfolio_fashion_google_slides_templates_100601.jpg"
          card={TempCard}
          onHandleZZim={onZZimToggleHandler}
          onClickTag={onTagClickHandler}
          propsWidth={280}
          propsHeight={350}
          propsFontSize={18}
          onClickImage={ModalToggleHandler}
        />
        <PlusCard.Wrapper onClick={onPlusCardClickHandler}>
          <PlusCard.InnerContainer>
            <PlusCard.Icon />
          </PlusCard.InnerContainer>
        </PlusCard.Wrapper>
      </CardWrapper>
    </>
  );
}

const CardWrapper = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const PlusCard = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 350px;
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    margin: 30px auto;
    background-color: white;
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
    width: 220px;
    height: 290px;
    border: 3px dotted #949494;
    border-radius: 27px;
  `,
  Icon: styled(CgMathPlus)`
    width: 100px;
    height: 100px;
    color: #949494;
  `,
};
