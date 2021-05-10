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
  `,
  leftFrame: styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `,
  image_1: styled.img`
    width: 50%;
    object-fit: contain;
  `,
  circle: styled.div`
    position: absolute;
    bottom: -50px;
    right: -50px;
    border-radius: 50%;
    width: 900px;
    height: 900px;
    z-index: -1;
    background: linear-gradient(to bottom, #fef9d7, #d299c2);
  `,
  title: styled.div`
    font-weight: bold;
    font-family: 'Samlip';
    font-size: 45px;
  `,
  titleBox: styled.div`
    margin: 100px auto;
  `,
  buttonBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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
      <Section.image_1 src={homeimage} alt="" />
    </Section.wrapper>
  );
}
