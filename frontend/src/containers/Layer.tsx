import React from 'react';
import Button from '../components/common/Button';

interface Props {}

function Layer(props: Props) {
  // const {} = props;

  return (
    <>
      <div>이건 레이어</div>
      <Button>하이</Button>
    </>
  );
}

export default Layer;
