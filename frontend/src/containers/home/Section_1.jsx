import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import BasicButton from '../../components/common/BasicButton';
import homeimage from '../../assets/home1.png';

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
    justify-content: flex-start;
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
    font-weight: bold;
    font-family: 'Samlip';
    font-size: 45px;
    @media only screen and (max-width: 1024px) {
      font-size: 35px;
    }
    @media only screen and (max-width: 768px) {
      /* font-size: 25px; */
    }
  `,
  titleBox: styled.div`
    margin: 100px auto;
    @media only screen and (max-width: 768px) {
      margin: 50px auto;
    }
    @media only screen and (max-width: 480px) {
      margin: 30px auto;
    }
  `,
  buttonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media only screen and (max-width: 768px) {
      width: 70%;
    }
    @media only screen and (max-width: 480px) {
      flex-direction: column;
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
          <Section.title>Co-Fix는</Section.title>
          <Section.title>실시간 기반 공동 첨삭</Section.title>
          <Section.title>플랫폼입니다.</Section.title>
        </Section.titleBox>
        <Section.buttonBox>
          <BasicButton
            text={'Co-Fix 시작하기'}
            backgroundColor={'#FAE5F4'}
            width={200}
            height={50}
            fontSize={17}
            onClickHandler={() => onClickStartHandler()}
          />
          <BasicButton
            text={'Pin Code'}
            backgroundColor={'#FAE5F4'}
            width={200}
            height={50}
            fontSize={17}
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
