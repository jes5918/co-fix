import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import update from 'immutability-helper';

// components
import ItemTypes from './ItemTypes';
import Block from './Block';

const DropZone = () => {
  const [childs, setChilds] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);

  const [currentId, setCurrentId] = useState(3);

  // 좌측 sidebar에서 컴포넌트를 드래그해오면 아래 이벤트 발생
  const appendChildToDropZone = (curId) => {
    setChilds((prev) => [...prev, { id: curId }]);
  };

  // 현재 board 부분을 drop target으로 만듦.
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.DIV,
    drop: () => {
      appendChildToDropZone(currentId);
      setCurrentId((prev) => prev + 1);
    },
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  }));

  const moveBlock = useCallback(
    (dragIndex, hoverIndex) => {
      const dragBlock = childs[dragIndex];
      setChilds(
        update(childs, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragBlock],
          ],
        }),
      );
    },
    [childs],
  );

  const renderBlock = (block, index) => {
    return (
      <Block key={block.id} index={index} id={block.id} moveBlock={moveBlock} />
    );
  };

  return (
    <div
      style={{
        width: '80%',
        height: '100%',
        backgroundColor: isOver ? 'lightyellow' : 'lightcoral',
      }}
      ref={drop}
    >
      {childs.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default DropZone;
