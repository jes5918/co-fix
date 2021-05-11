// Roll : 편집 화면에서 우측 Comment 작성 및 보이는 부분의 상태를 관리함.

import React, { useState } from 'react';
import styled from 'styled-components';

import CommentForm from '../components/innerCommentElements/CommentForm';
import CommentWrapper from '../components/innerCommentElements/CommentWrapper';

const S = {
  CommentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100%;
    padding: 20px 10px;
  `,
};

export default function CommentContainer({ data }) {
  const [isToggle, setIsToggle] = useState(false);
  const onHandleSubmit = () => {
    // 1. 이벤트 props로 내려주고,
    // 2. 이벤트 발생 -> 기존 데이터에 새로운 데이터 추가.
    // 3. 컴포넌트 unMount 되면 백에 통신 보내고 종료..?(쓸때마다 보내면 비효율적이려나...? 적어서 괜찮을 것 같기도)
  };
  const onHandleClick = (e) => {
    // comment Agree 로직 처리

    // toggle 처리
    if (e.target.nodeName === 'BUTTON') {
      console.log(e.target.dataset.userId);
      setIsToggle(!isToggle);
    }
  };

  return (
    <S.CommentContainer onClick={(e) => onHandleClick(e)}>
      {data &&
        data.map((item) => {
          return (
            <CommentWrapper
              key={item.id}
              userId={item.id}
              avatar={item.avatar}
              comment={item.comment}
              nickName={item.nickName}
              isToggle={isToggle}
            />
          );
        })}
      <CommentForm />
    </S.CommentContainer>
  );
}
