import React from 'react';
import InputForm from './InputForm';

const TestArea = () => {
  const onSubmit = (searchWord: string) => {
    console.log('searchWord : ', searchWord);
  };
  return (
    <>
      <InputForm onSubmit={onSubmit} width={400} height={50} />
    </>
  );
};

export default TestArea;
