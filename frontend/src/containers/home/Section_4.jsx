import React from 'react';
import styled from 'styled-components';
import useScrollFadeIn from '../../hook/useScrollFadeIn';
import conference from '../../assets/conference.png';
import chat from '../../assets/chat.png';
import fix from '../../assets/fix.png';

const Section = {
  wrapper: styled.div`
    width: 100%;
    min-height: 100vh;
    margin: auto;
    background: linear-gradient(to bottom, #fffdf3, #fce6f6);
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* flex-wrap: wrap; */
    padding: 30px 5%;
  `,
  leftTitle: styled.div`
    width: 100%;
    height: 30%;
    font-size: 2.5rem;
    font-family: 'S-CoreDream-6Bold';
    color: #f36c7e;
    @media only screen and (max-width: 768px) {
      font-size: 2rem;
    }
  `,
  cardContainer: styled.div`
    width: 100%;
    min-height: 80vh;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  `,
  card1: styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    box-shadow: 4px 4px 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin: 30px 0;
    padding: 30px;
    @media only screen and (max-width: 768px) {
      padding: 15px;
    }
    @media only screen and (max-width: 480px) {
      width: 70%;
      height: 400px;
    }
  `,
  card2: styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    box-shadow: 4px 4px 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    align-self: center;
    margin: 30px 15px;
    padding: 30px;
    @media only screen and (max-width: 768px) {
      padding: 15px;
    }
    @media only screen and (max-width: 480px) {
      width: 70%;
      height: 400px;
    }
  `,
  card3: styled.div`
    width: 400px;
    height: 500px;
    background-color: #fff;
    box-shadow: 4px 4px 5px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    margin: 30px 0;
    padding: 30px;
    @media only screen and (max-width: 768px) {
      padding: 15px;
    }
    @media only screen and (max-width: 480px) {
      width: 70%;
      height: 400px;
    }
  `,
  cardImage: styled.img`
    /* width: 90%; */
    max-height: 50%;
    object-fit: contain;
  `,
  cardDescribe: styled.div`
    /* width: 90%; */
    height: 50%;
    padding: 5%;
    /* background-color: red; */
    font-family: 'S-CoreDream-6Bold';
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  cardTitle: styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #df5f5f;
    @media only screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media only screen and (max-width: 480px) {
      font-size: 1.2rem;
    }
  `,
  cardContentBox: styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  cardContent: styled.div`
    word-break: keep-all;
    font-size: 17px;
    text-align: center;
    @media only screen and (max-width: 768px) {
      font-size: 1rem;
    }
    @media only screen and (max-width: 480px) {
      font-size: 0.9rem;
    }
  `,
};
export default function Section_4() {
  const animatedFadeItem = {
    0: useScrollFadeIn('up', 1, 0),
    1: useScrollFadeIn('up', 1, 0.2),
    2: useScrollFadeIn('up', 1, 0.4),
    3: useScrollFadeIn('right', 1, 0.3),
    4: useScrollFadeIn('right', 1, 0.4),
  };
  return (
    <Section.wrapper>
      <Section.leftTitle>CO-FIX PROVIDE</Section.leftTitle>
      <Section.cardContainer>
        <Section.card1 {...animatedFadeItem[0]}>
          <Section.cardImage src={conference}></Section.cardImage>
          <Section.cardDescribe>
            <Section.cardTitle>VIDEO CONFERENCE</Section.cardTitle>
            <Section.cardContentBox>
              <Section.cardContent>
                CO-FIX는 화상 미팅을 지원합니다.
                <br />
                효율적으로 다양한 의견을
                <br />
                나누어 보세요.
              </Section.cardContent>
            </Section.cardContentBox>
          </Section.cardDescribe>
        </Section.card1>
        <Section.card2 {...animatedFadeItem[1]}>
          <Section.cardImage src={chat}></Section.cardImage>
          <Section.cardDescribe>
            <Section.cardTitle>CO-FIX</Section.cardTitle>
            <Section.cardContentBox>
              <Section.cardContent>
                실시간으로 문서를 첨삭해보세요.
                <br />
                문장에 대한 다양한 의견을
                <br />
                남길 수 있습니다.
              </Section.cardContent>
            </Section.cardContentBox>
          </Section.cardDescribe>
        </Section.card2>
        <Section.card3 {...animatedFadeItem[2]}>
          <Section.cardImage src={fix}></Section.cardImage>
          <Section.cardDescribe>
            <Section.cardTitle>RESULT</Section.cardTitle>
            <Section.cardContentBox>
              <Section.cardContent>
                첨삭 결과를 한 번에 볼 수 있습니다.
                <br />
                어떤 문장을 수정해야하는지
                <br />한 번에 모아서 확인해보세요.
              </Section.cardContent>
            </Section.cardContentBox>
          </Section.cardDescribe>
        </Section.card3>
      </Section.cardContainer>
    </Section.wrapper>
  );
}
