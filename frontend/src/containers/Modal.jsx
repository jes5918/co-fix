import React from 'react';
import styled from 'styled-components';
import { BsX } from 'react-icons/bs';

export default function Modal({
  children,
  ModalToggleHandler,
  isModalOpen,
  height,
  width,
}) {
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

const ModalLayer = styled.div`
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
  z-index: 900;
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
  z-index: 910;
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  padding: 70px 50px;
  height: ${({ height }) => (height ? `${height}` : '300px')};
  width: ${({ width }) => (width ? `${width}` : '500px')};
  border-radius: 15px;
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
  background-color: rgb(255, 255, 255);
  z-index: 920;
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
