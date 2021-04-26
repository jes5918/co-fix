import React from 'react';
<<<<<<< HEAD
import Carousel from './Carousel/Carousel';
=======
import InputForm from './InputForm';
import Icon from './Icon';
>>>>>>> 369e24c ([feat/FE] : styled Icon)

const TestArea = () => {
  const onSubmit = (searchWord: string) => {
    console.log('searchWord : ', searchWord);
  };
  return (
<<<<<<< HEAD
    <div style={{ maxWidth: 1200 }}>
      <Carousel show={4}>
        <div style={{ padding: 8, boxSizing: 'border-box' }}>
          <img
            src="/images/1.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/2.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/3.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/4.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/5.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/1.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/2.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/3.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/4.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
        <div style={{ padding: 8 }}>
          <img
            src="/images/5.jpg"
            style={{ maxWidth: 300 }}
            alt="placeholder"
          />
        </div>
      </Carousel>
    </div>
=======
    <>
      <InputForm onSubmit={onSubmit} width={400} height={50} />
      <Icon menuName={'사진'} />
    </>
>>>>>>> 369e24c ([feat/FE] : styled Icon)
  );
};

export default TestArea;
