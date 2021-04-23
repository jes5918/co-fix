import React, { MouseEvent } from 'react';
import styled from 'styled-components';

// props 타입
type SliderProps = {
  translateValue: number;
  images: { url: string; id: number }[];
  moveRight: () => void;
  moveLeft: () => void;
};

// 이미지 박스
type CardContainerStyle = {
  width?: number;
  height?: number;
  thumbnail?: string;
};

type CarouselCardProps = {
  width?: number;
  height?: number;
  thumbnail?: string;
  translateValue?: number;
};

// Slider 스타일
const Slider = {
  Slider: styled.div`
    width: 200px;
    height: 300px;
    position: relative;
    overflow: hidden;
  `,
  ImageBox: styled.div<CarouselCardProps>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
  `,
  Image: styled.img.attrs((props: CarouselCardProps) => ({
    src: props.thumbnail,
  }))<CarouselCardProps>`
    object-fit: contain;
  `,
};

const CarouselSlider = ({
  translateValue,
  images,
  moveLeft,
  moveRight,
}: SliderProps) => {
  const onClickRight = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    moveRight();
  };

  const onClickLeft = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    moveLeft();
  };
  return (
    <Slider.Slider>
      {images.map(({ url, id }) => {
        return (
          <Slider.ImageBox key={id} width={200} height={300}>
            <Slider.Image thumbnail={url}></Slider.Image>
          </Slider.ImageBox>
        );
      })}
    </Slider.Slider>
  );
};

export default CarouselSlider;
