import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
interface cardProps extends styleCardProps {
  thumbnailURL: string;
  card: {
    zzim: boolean;
    pk: number;
    madeby: string;
    createdAt: string;
    tags: Array<string>;
  };
  onHandleZZim: () => void;
  onClickTag: (tag: string) => void;
  onClickImage: () => void;
}

interface styleCardProps {
  propsWidth?: number;
  propsHeight?: number;
  propsFontSize?: number;
}
const cardStyle = {
  mainFrame: styled.div<styleCardProps>`
    width: ${({ propsWidth }) => `${propsWidth ? propsWidth : 300}px`};
    height: ${({ propsHeight }) => `${propsHeight ? propsHeight : 400}px`};
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    margin: 30px auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    &:hover > * {
      top: 0px;
      opacity: 1;
    }
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
    }
  `,
  imgFrame: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    border-radius: 30px;
  `,
  hoverContainer: styled.div`
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.55);
    position: absolute;
    top: 20%;
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10%;
  `,
  madeby: styled.div<styleCardProps>`
    color: white;
    font-weight: bold;
    font-size: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize : 17}px`};
    margin-bottom: 15px;
    text-align: center;
    word-break: keep-all;
    line-height: ${({ propsFontSize }) =>
      `${propsFontSize ? propsFontSize + 10 : 27}px`};
  `,
  zzimedIcon: styled(AiFillStar)`
    position: absolute;
    bottom: 28%;
    right: 5%;
    cursor: pointer;
    color: rgb(215 164 4);
    font-size: 30px;
  `,
  zzimIcon: styled(AiOutlineStar)`
    position: absolute;
    bottom: 28%;
    right: 5%;
    cursor: pointer;
    color: rgb(215 164 4);
    font-size: 30px;
  `,
  tagBox: styled.div`
    width: 100%;
    height: 25%;
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
  tag: styled.span<styleCardProps>`
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

function Card(props: cardProps) {
  const {
    thumbnailURL,
    propsWidth,
    propsHeight,
    propsFontSize,
    card,
    onHandleZZim,
    onClickTag,
    onClickImage,
  } = props;

  return (
    <cardStyle.mainFrame propsWidth={propsWidth} propsHeight={propsHeight}>
      <cardStyle.imgFrame src={thumbnailURL} alt="" />
      <cardStyle.hoverContainer>
        {/* hover */}
        <cardStyle.infoBox onClick={() => onClickImage()}>
          <cardStyle.madeby propsFontSize={propsFontSize}>
            {card && card.madeby}님의 템플릿
          </cardStyle.madeby>
          <cardStyle.madeby propsFontSize={propsFontSize}>
            {card && card.createdAt}
          </cardStyle.madeby>
        </cardStyle.infoBox>
        {card && card.zzim ? (
          <cardStyle.zzimedIcon onClick={() => onHandleZZim()} />
        ) : (
          <cardStyle.zzimIcon onClick={() => onHandleZZim()} />
        )}
        <cardStyle.tagBox>
          <cardStyle.tags>
            {card &&
              card.tags.map(
                (tag: string, i: number): ReactElement => {
                  return (
                    <cardStyle.tag
                      key={i}
                      onClick={() => onClickTag(tag)}
                      propsFontSize={propsFontSize}
                    >
                      #{tag}
                    </cardStyle.tag>
                  );
                },
              )}
          </cardStyle.tags>
        </cardStyle.tagBox>
      </cardStyle.hoverContainer>
    </cardStyle.mainFrame>
  );
}
export default Card;
