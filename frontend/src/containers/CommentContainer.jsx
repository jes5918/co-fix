// Roll : 편집 화면에서 우측 Comment 작성 및 보이는 부분의 상태를 관리함.

// 데이터 형식
//

import React from 'react';
import styled from 'styled-components';

import CommentForm from '../components/innerCommentElements/CommentForm';
import CommentWrapper from '../components/innerCommentElements/CommentWrapper';

const S = {
  CommentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    height: 600px;
    margin-top: 100px;
    border: 2px solid #a5a5a5;
    border-radius: 20px;
  `,
  TopBox: styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    flex-basis: 10%;
  `,
  MiddleBox: styled.div`
    flex-basis: 70%;
  `,
  BottomBox: styled.div`
    flex-basis: 20%;
  `,
  FixButton: styled.button`
    border: 2px solid red;
    border-radius: 10px;
    padding: 4px 8px;
    margin-right: 10px;
    font-weight: bold;
    color: red;
    cursor: pointer;
    &:hover {
      background-color: red;
      color: white;
    }
  `,
};

function CommentContainer({ data }) {
  return (
    <S.CommentContainer>
      <S.TopBox>
        <S.FixButton>!Fix</S.FixButton>
        <span style={{ color: 'red', fontWeight: 'bold' }}>
          고칠 필요가 있다고 생각하면 눌러주세요!
        </span>
      </S.TopBox>
      <S.MiddleBox>
        {data &&
          data.map((item) => {
            return (
              <CommentWrapper
                key={item.id}
                avatar={item.avatar}
                comment={item.comment}
                nickname={item.nickname}
              />
            );
          })}
      </S.MiddleBox>
      <S.BottomBox>
        <CommentForm></CommentForm>
      </S.BottomBox>
    </S.CommentContainer>
  );
}

export default CommentContainer;
