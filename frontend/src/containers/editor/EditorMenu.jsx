import React from "react";
import styled from "styled-components";
import {
  BiImageAdd,
  BiPalette,
  BiText,
  BiCodeAlt,
  BiWindowAlt,
  BiGridAlt,
  BiLayout,
  BiMinus,
  BiHeartCircle,
} from "react-icons/bi";

const MenuStyle = {
  leftMenuContainer: styled.div`
    width: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* padding-top: 6vh; */
    /* box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2); */
    border-right: solid 1.5px gray;
    top: 0;
  `,
  IconContainer: styled.div`
    width: 75px;
    height: 65px;
    display: flex;
    flex-direction: column;
    padding: 7px;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #e7e7e7;
    }
  `,
  MenuText: styled.div`
    font-size: 12px;
    /* font-weight: bold; */
    font-family: "Roboto";
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

function EditorMenu() {
  return (
    <MenuStyle.leftMenuContainer>
      <MenuStyle.IconContainer>
        <BiImageAdd style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>사진</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiPalette style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>테마</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiText style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>텍스트</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiCodeAlt style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>코드박스</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiWindowAlt style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>코드실행</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiGridAlt style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>도형</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiLayout style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>프레임</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiMinus style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>구분선</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
      <MenuStyle.IconContainer>
        <BiHeartCircle style={{ fontSize: "28px" }} />
        <MenuStyle.MenuText>아이콘</MenuStyle.MenuText>
      </MenuStyle.IconContainer>
    </MenuStyle.leftMenuContainer>
  );
}

export default EditorMenu;
