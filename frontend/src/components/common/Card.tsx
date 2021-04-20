import React from 'react';
import styled from 'styled-components';
interface cardProps {}
const cardStyle = {
  mainFrame: styled.div`
    width: 300px;
    height: 400px;
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    &:hover > * {
      top: 0px;
      opacity: 1;
    }
  `,
  imgFrame: styled.img`
    width: 300px;
    height: 400px;
    object-fit: cover;
    z-index: 1;
    border-radius: 30px;
  `,
  hoverContainer: styled.div`
    width: 300px;
    height: 400px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.55);
    position: absolute;
    top: 200px;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
    border-radius: 30px;
  `,
  infoBox: styled.div`
    width: 100%;
    height: 70%;

    margin: 0;
  `,
  tagBox: styled.div`
    width: 100%;
    height: 30%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(256, 256, 256, 0.85);
  `,
  tags: styled.div`
    width: 85%;
    font-size: 17px;
    color: #262626;
    font-weight: bold;
    text-align: center;
    font-family: 'NotoSans';
  `,
};

function Card(props: cardProps) {
  const {} = props;

  return (
    <cardStyle.mainFrame>
      <cardStyle.imgFrame
        src="https://i0.wp.com/themes.svn.wordpress.org/elegant-portfolio/1.0.4/screenshot.png"
        alt=""
      />
      <cardStyle.hoverContainer>
        {/* hover */}
        <cardStyle.infoBox></cardStyle.infoBox>
        <cardStyle.tagBox>
          <cardStyle.tags>
            #FE개발자 #React #TypeScript #카카오 #CardComponent
          </cardStyle.tags>
        </cardStyle.tagBox>
      </cardStyle.hoverContainer>
    </cardStyle.mainFrame>
  );
}
export default Card;
