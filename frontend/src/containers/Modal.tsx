import React from 'react';
import styled from 'styled-components';

const ModalLayer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalCloseLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10010;
`;

interface ModalContentProps {
  width?: string;
  height?: string;
}

const ModalContent = styled.div<ModalContentProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  padding: 10px;
  height: ${({ height }) => `${height}`};
  width: ${({ width }) => `${width}`};
  border-radius: 30px;
  background-color: rgb(255, 255, 255);
  z-index: 10020;
`;

interface Props extends ModalContentProps {
  children: React.ReactNode;
  ModalToggleHandler: () => void;
  isModalOpen: boolean;
}

function Modal(props: Props) {
  const { children, ModalToggleHandler, isModalOpen, height, width } = props;

  if (isModalOpen) {
    return (
      <ModalLayer>
        <ModalCloseLayer onClick={ModalToggleHandler} />
        <ModalContent height={height} width={width}>
          {children}
        </ModalContent>
      </ModalLayer>
    );
  } else {
    return null;
  }
}

export default Modal;
