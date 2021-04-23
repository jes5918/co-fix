import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  show: number;
}

type ArrowStyle = {
  left?: number;
  right?: number;
};

type TransformStyle = {
  currentIndex?: number;
  show?: number;
};

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 'auto';
    display: flex;
    flex-direction: column;
    background-color: lightgray;
  `,
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    position: relative;
  `,
  ContentWrapper: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  Content: styled.div<TransformStyle>`
    display: flex;
    transition: all 250ms linear;
    transform: ${(props) => `translateX(-${props.currentIndex}%)`};
    & > * {
      width: ${(props) => `calc(100% / ${props.show})`};
      flex-shrink: 0;
      flex-grow: 1;
    }
  `,
  Arrow: styled.button<ArrowStyle>`
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    left: ${(props) => `${props.left}px`};
    right: ${(props) => `${props.right}px`};
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 0.8;
    }
  `,
};

const Carousel = ({ children, show }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(React.Children.count(children));

  const next = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    console.log('currentIndex : ', currentIndex * (100 / show));
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    console.log('currentIndex : ', currentIndex * (100 / show));
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    setLength(React.Children.count(children));
  }, [children]);
  return (
    <Styled.Container>
      <Styled.Wrapper>
        {currentIndex > 0 && (
          <Styled.Arrow onClick={prev} left={24}>
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </Styled.Arrow>
        )}
        <Styled.ContentWrapper>
          <Styled.Content
            currentIndex={currentIndex * (100 / show)}
            show={show}
          >
            {children}
          </Styled.Content>
        </Styled.ContentWrapper>
        {currentIndex < length - 1 && (
          <Styled.Arrow onClick={next} right={24}>
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </Styled.Arrow>
        )}
      </Styled.Wrapper>
    </Styled.Container>
  );
};

export default Carousel;
