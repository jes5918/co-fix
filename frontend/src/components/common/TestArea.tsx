import React from 'react';
import Carousel from './Carousel/Carousel';

const TestArea = () => {
  const onSubmit = (searchWord: string) => {
    console.log('searchWord : ', searchWord);
  };
  return (
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
  );
};

export default TestArea;
