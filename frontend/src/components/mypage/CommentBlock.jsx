import React, { useState } from 'react';
import styled from 'styled-components';
import Collapse from '@kunukn/react-collapse';

const InputBlock = {
  wrapper: styled.div`
    margin: 0px;
  `,
  input: styled.div`
    margin: 5px;
    padding: 10px 30px;
    width: fit-content;
    max-width: 80%;
    border-radius: 20px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
    background-color: ${({ isComment }) =>
      `${isComment ? 'rgba(123, 42, 4, 0.4)' : 'rgba(0, 0, 0, 0.15)'}`};
  `,
  commentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 10px;
  `,
  comment: styled.div`
    width: fit-content;
    max-width: 80%;
    margin: 5px;
    padding: 10px 30px;
    border-radius: 20px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.3);
    &:hover {
      background-color: #c8ffff;
    }
  `,
};

export default function CommentBlock({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <InputBlock.wrapper>
        <InputBlock.input
          isComment={data.comments.length === 0 ? false : true}
          onClick={() => onClickHandler()}
        >
          {data.content}
        </InputBlock.input>
        <Collapse isOpen={isOpen}>
          <InputBlock.commentWrapper>
            {data.comments.map((comment, i) => {
              return (
                <InputBlock.comment key={i}>
                  {comment.content}
                </InputBlock.comment>
              );
            })}
          </InputBlock.commentWrapper>
        </Collapse>
      </InputBlock.wrapper>
    </>
  );
}
