// Roll : 편집 화면에서 우측 Comment 작성 및 보이는 부분의 상태를 관리함.

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export default function TEST() {
  const { sentenceId, content, comments } = useSelector((state) => {
    const selectNum = state.document.selectNum;
    return state.document.data.filter((content) => {
      return content.sentenceId === selectNum;
    })[0];
  });

  return (
    <Wrapper>
      <h3>글번호 : {sentenceId}</h3>
      <h3>글내용 : {content}</h3>
      <hr />
      {comments.length ? (
        comments.map((comment, idx) => {
          return (
            <>
              <div key={idx}>댓글 : {comment.content}</div>
            </>
          );
        })
      ) : (
        <h4>댓글이 없습니다.</h4>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-right: 30px;
`;
