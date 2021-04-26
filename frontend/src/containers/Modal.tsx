import React from 'react';
import styled from 'styled-components';
import { BsX } from 'react-icons/bs';

const ModalLayer = styled.div<ModalLayerProps>`
  position: fixed;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
`;

const ModalCloseLayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10010;
`;

const ModalContent = styled.div<ModalContentProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  padding: 70px 50px;
  /* width: fit-content;
  height: fit-content; */
  height: ${({ height }) => `${height}`};
  width: ${({ width }) => `${width}`};
  border-radius: 15px;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
  background-color: rgb(255, 255, 255);
  z-index: 10020;
  animation: modal-show 0.5s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -200px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const ExitIcon = styled(BsX)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  color: rgba(0, 0, 0, 0.9);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
`;

interface ModalLayerProps {
  isModalOpen: boolean;
}

interface ModalContentProps {
  width?: string;
  height?: string;
}

interface Props extends ModalContentProps {
  children: React.ReactNode;
  ModalToggleHandler: () => void;
  isModalOpen: boolean;
}

function Modal(props: Props) {
  const { children, ModalToggleHandler, isModalOpen, height, width } = props;

  return (
    <ModalLayer isModalOpen={isModalOpen}>
      <ModalCloseLayer onClick={ModalToggleHandler} />
      <ModalContent height={height} width={width}>
        <ExitIcon onClick={ModalToggleHandler} />
        {children}
      </ModalContent>
    </ModalLayer>
  );
}

export default Modal;
