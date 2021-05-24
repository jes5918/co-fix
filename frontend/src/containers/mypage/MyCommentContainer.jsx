import React from 'react';
import styled from 'styled-components';
import CommentWrapper from '../../components/innerCommentElements/CommentWrapper';
import useCommentData from '../../hook/useComment';
import NoCommentImage from '../../assets/NoComment.png';

const S = {
  CommentContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100%;
    padding-right: 40px;
  `,
  NoCommentWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-family: 'S-CoreDream-6Bold';
    color: #838383;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  `,
  Image: styled.img.attrs({
    src: NoCommentImage,
  })`
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
  `,
  CommentNotExistInfoWrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  CommentNotExistInfo: styled.span`
    font-family: 'S-CoreDream-6Bold';
    font-size: 1.3rem;
    color: #838383;
  `,
};

export default function CommentContainer({ sentenceId }) {
  const comments = useCommentData();
  return (
    <>
      {!sentenceId ? (
        <S.CommentNotExistInfoWrapper>
          <S.CommentNotExistInfo>문장을 선택해주세요.</S.CommentNotExistInfo>
        </S.CommentNotExistInfoWrapper>
      ) : comments.length > 0 ? (
        <S.CommentContainer>
          {sentenceId &&
            comments[0] !== null &&
            comments.map((item, idx) => {
              return (
                <CommentWrapper
                  key={idx * 123413}
                  comment={item}
                  sentenceId={sentenceId}
                />
              );
            })}
        </S.CommentContainer>
      ) : (
        <S.NoCommentWrapper>
          <S.Image />
          해당 문장에 대한 의견이 없습니다
        </S.NoCommentWrapper>
      )}
    </>
  );
}
