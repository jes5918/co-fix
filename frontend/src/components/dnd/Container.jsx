import React from 'react';
import styled from 'styled-components';
import ItemTypes from './ItemTypes';
import { useDrag, DragPreviewImage } from 'react-dnd';

const Styled = {
  Div: styled.div`
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 20px;
    opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const Container = () => {
  // collected props :
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.DIV, // required
    // item: { id }, // required
    // previewOptions: ,
    // options: ,
    // end: ,
    // canDrag: ,
    // isDragging: ,
    collect: (monitor) => ({
      isDragging: !monitor.isDragging(),
    }),
  }));
  return (
    <>
      <DragPreviewImage
        connect={dragPreview}
        src={
          'https://image-notepet.akamaized.net/resize/620x-/seimage/20190816%2Ff07bd9f247293aa0317f2c8faba7e83b.png'
        }
      />
      <Styled.Div ref={drag} isDragging={isDragging}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>드래그</span>
      </Styled.Div>
    </>
  );
};

export default Container;
