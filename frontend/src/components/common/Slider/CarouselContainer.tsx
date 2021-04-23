import React, { useState } from 'react';
import CarouselSlider from './CarouselSlider';
import CarouselDot from './CarouselDot';

interface Props {}

const images = [
  { url: '/images/1.jpg', id: 1 },
  { url: '/images/2.jpg', id: 2 },
  { url: '/images/3.jpg', id: 3 },
  { url: '/images/4.jpg', id: 4 },
  { url: '/images/5.jpg', id: 5 },
];

const CarouselContainer = (props: Props) => {
  const [translateValue, setTranslateValue] = useState<number>(0);

  const sliderWidth = 70; // slider의 크기

  function moveRight(): void {
    if (translateValue !== sliderWidth * (images.length - 1)) {
      setTranslateValue((prev) => prev + sliderWidth);
    } else {
      setTranslateValue(0);
    }
  }

  function moveLeft(): void {
    if (translateValue !== 0) {
      setTranslateValue((prev) => prev - sliderWidth);
    } else {
      setTranslateValue(sliderWidth * (images.length - 1));
    }
  }

  return (
    <>
      <CarouselSlider
        translateValue={translateValue}
        images={images}
        moveLeft={moveLeft}
        moveRight={moveRight}
      />
      <CarouselDot />
    </>
  );
};

export default CarouselContainer;
