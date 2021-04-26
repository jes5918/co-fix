import React, { useState } from 'react';
import styled from 'styled-components';
import Card from 'components/common/Card';
import Modal from 'containers/Modal';
import ModalContent from 'components/template/ModalContent';

interface Props {}

const CardWrapper = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const TempCard = {
  zzim: false,
  pk: 1,
  madeby: '의수',
  createdAt: '2020. 04. 26',
  tags: ['React', 'Redux', 'Frontend'],
};

function TemplateBody(props: Props) {
  const {} = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onZZimToggleHandler = () => {
    console.log('찜클릭');
  };

  const onTagClickHandler = (tag: string) => {
    console.log(`${tag}`, '태그클릭');
  };

  const ModalToggleHandler = () => {
    setIsModalOpen(!isModalOpen);
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
      </CardWrapper>
    </>
  );
}

export default TemplateBody;
