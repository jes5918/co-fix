import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const blockStyle = {
  width: '100%',
  height: '10%',
  backgroundColor: 'lightgreen',
  border: '1px dashed gray',
  cursor: 'pointer',
};

const Block = ({ id, index, moveBlock }) => {
  // drop target 이면서 draggable 해야함.
  const ref = useRef(null);

  // drop target
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      // hover 됐을 때 호출되는 함수.
      // drop()과는 달리 canDrop()이 false를 반환해도, 발생하는 함수이다.
      // !이 함수를 사용하는 이유는 hover 됐을 때, 위치가 어떻게 변하는지 알려주기 위함.
      if (!ref.current) {
        // ref 객체에 담겨져있는게 없으면 아무것도 수행하지 않음.
        return;
      }
      // drag src의 item 속성에서 index를 정의하자.
      const dragIndex = item.index;
      const hoverIndex = index; // hover에 사용할 index, 얜 props로 받음.

      if (dragIndex === hoverIndex) {
        // drag 하는 대상과 hover된 대상이 같은 경우는 무시.
        return;
      }

      // 참고 : https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
      // ref와 연결되어있는 element가 담겨있는 부모 요소를 기준으로 거리값 추출.
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // ref 요소의 부모 기준으로 element의 중간까지의 위에서부터 길이
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 사용자의 마우스 위치
      const clientOffset = monitor.getClientOffset();

      // 마우스 위치 - hover되는 아이템의 top 값
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // !오직 move는 hover되는 아이템 높이의 절반 이상 내려가거나 올라갔을 때 발생.
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        // 마우스 위치가 hover되는 아이템의 절반 높이 보다 아래로 내려가야함.
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        // 마우스 위치가 hover되는 아이템의 절반 높이 보다 위로 올라가야함.
        return;
      }

      moveBlock(dragIndex, hoverIndex);

      item.index = hoverIndex; // 바뀌고 나서, hover된 위치로 현재 item의 index를 바꿔줌.
      // 여기서 아이템의 index를 바꾸는 건 좋지 않지만, 성능 상으로 괜찮음.
    },
  });

  // 이 객체는 drop target임과 동시에 draggable 해야함.
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BLOCK,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref)); // 중요!!
  return (
    <div
      ref={ref}
      style={{ ...blockStyle, opacity }}
      data-handler-id={handlerId} // dataset 속성으로 ID 저장.
    ></div>
  );
};

export default Block;
