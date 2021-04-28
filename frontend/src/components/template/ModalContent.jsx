import BasicButton from "../common/BasicButton";
import React from "react";
import styled from "styled-components";

const TemplateDetailModalContentWrapper = styled.div`
  width: 1000px;
  height: 500px;
  display: flex;
  flex-direction: row;
`;

const ModalLeftImageFrame = styled.img`
  width: 65%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  border-radius: 30px;
`;

const ModalRightFrame = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  padding: 30px auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ModalDetailFrame = {
  mainFrame: styled.div`
    width: 80%;
    height: 10%;
  `,
  userDetails: styled.div`
    font-size: 24px;
  `,
  tags: styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    word-break: keep-all;
  `,
  tag: styled.span`
    cursor: pointer;
    font-size: 18px;
    color: #262626;
    text-align: center;
    font-family: "NotoSans";
    line-height: 20px;
    word-break: keep-all;
    margin-right: 15px;

    &:hover {
      font-weight: bold;
    }
  `,
};

function ModalContent({ thumbnailURL, card, onClickTag }) {
  const UseTemplateHandler = () => {
    console.log("템플릿 사용하기");
  };

  return (
    <TemplateDetailModalContentWrapper>
      <ModalLeftImageFrame src={thumbnailURL} alt="" />
      <ModalRightFrame>
        <BasicButton
          width={300}
          height={50}
          fontSize={18}
          onClickHandler={UseTemplateHandler}
          text="이 템플릿 사용하기"
        />
        <ModalDetailFrame.mainFrame>
          <ModalDetailFrame.userDetails>
            {card.madeby}
          </ModalDetailFrame.userDetails>
          <ModalDetailFrame.tags>
            {card &&
              card.tags.map((tag, i) => {
                return (
                  <ModalDetailFrame.tag key={i} onClick={() => onClickTag(tag)}>
                    #{tag}
                  </ModalDetailFrame.tag>
                );
              })}
          </ModalDetailFrame.tags>
        </ModalDetailFrame.mainFrame>
      </ModalRightFrame>
    </TemplateDetailModalContentWrapper>
  );
}

export default ModalContent;
