import React from 'react';
import styled from 'styled-components';

// components
import CommentContainer from '../containers/CommentContainer';
import DocumentContainer from '../containers/DocumentContainer';

const Styled = {
  Space: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const testData = [
  {
    id: 0,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickname: '비와 당신',
    comment: '지금 이 순간, 마법처럼 날 묶어왔던 사슬을 벗어던진다.',
  },
  {
    id: 1,
    avatar:
      'https://www.pikpng.com/pngl/m/357-3577415_free-png-download-cat-cute-png-images-background.png',
    nickname: '비와 당신',
    comment:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque , e.',
  },
];

const TestArea = () => {
  return (
    <Styled.Space>
      <CommentContainer data={testData} />
    </Styled.Space>
  );
};

export default TestArea;
