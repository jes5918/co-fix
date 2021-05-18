import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import BasicButton from '../../components/common/BasicButton';
import homeimage from '../../assets/home.png';

const Section = {
  wrapper: styled.div`
    width: 100%;
    height: 100vh;
    background-color: transparent;
    z-index: 0;
    display: flex;
    position: relative;
    justify-content: flex-end;
    padding-top: 86px;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  `,
  leftFrame: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  `,
  imageFrame: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  `,
  image_1: styled.img`
    width: 100%;
    object-fit: contain;
    @media only screen and (max-width: 1024px) {
    }
    @media only screen and (max-width: 768px) {
      width: 70%;
    }
    @media only screen and (max-width: 480px) {
      width: 90%;
    }
  `,
  circle: styled.div`
    position: absolute;
    bottom: -50px;
    right: -50px;
    border-radius: 50%;
    width: 800px;
    height: 800px;
    z-index: -1;
    background: linear-gradient(to bottom, #fef9d7, #d299c2);
    @media only screen and (max-width: 1024px) {
      width: 780px;
      height: 780px;
    }
    @media only screen and (max-width: 768px) {
      width: 600px;
      height: 600px;
    }
  `,
  title: styled.div`
    font-weight: normal;
    font-family: 'S-CoreDream-6Bold';
    font-size: 45px;
    @media only screen and (max-width: 1024px) {
      font-size: 35px;
    }
    @media only screen and (max-width: 768px) {
      /* font-size: 25px; */
    }
  `,
  titleBox: styled.div`
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
      margin: 50px auto;
    }
    @media only screen and (max-width: 480px) {
      margin: 30px auto;
    }
  `,
  buttonBox: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 50px;
    @media only screen and (max-width: 768px) {
      width: 70%;
      margin-top: 10px;
    }
    @media only screen and (max-width: 480px) {
      flex-direction: column;
      margin-top: 10px;
    }
  `,
};
export default function Section_1({ ModalToggleHandler }) {
  const history = useHistory();
  const onClickStartHandler = () => {
    if (localStorage.getItem('user')) {
      history.push('/create');
    } else {
      ModalToggleHandler();
    }
  };
  return (
    <Section.wrapper>
      <Section.circle></Section.circle>
      <Section.leftFrame>
        <Section.titleBox>
          <Section.title>Co-Fix로</Section.title>
          <Section.title>라이브 첨삭을</Section.title>
          <Section.title>시작해보세요.</Section.title>
        </Section.titleBox>
        <Section.buttonBox>
          <BasicButton
            text={'START CO-FIX'}
            backgroundColor={'#fff'}
            border={'4px solid #FAE5F4'}
            width={200}
            height={70}
            fontSize={20}
            onClickHandler={() => onClickStartHandler()}
          />
          <BasicButton
            text={'PIN CODE'}
            backgroundColor={'#FAE5F4'}
            width={200}
            height={70}
            fontSize={20}
            onClickHandler={() => {
              history.push('/join');
            }}
          />
        </Section.buttonBox>
      </Section.leftFrame>
      <Section.imageFrame>
        <Section.image_1 src={homeimage} alt="" />
      </Section.imageFrame>
    </Section.wrapper>
  );
}
