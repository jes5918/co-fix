import React from 'react';
import BasicButton from '../components/common/BasicButton';

interface Props {}

function Layer(props: Props) {
  const basicButtonClickHandler = () => {
    console.log(`버튼클릭`);
  };
  return (
    <>
      <div>이건 레이어</div>
      <BasicButton
        width={170}
        height={45}
        // backgroundColor="blue"
        onClickHandler={basicButtonClickHandler}
        text="하우"
      />
    </>
  );
}

export default Layer;
