import React from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";
import { AccountCircle } from "@styled-icons/material";

const IconStyle = {
  IconContainer: styled.div`
    width: 65px;
    height: 65px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: space-around;
    align-items: center;
    background-color: #e7e7e7;
  `,
  Icon: styled(BiImageAdd)`
    font-size: 30px;
  `,
  MenuText: styled.div`
    font-size: 14px;
    font-weight: bold;
    font-family: "Roboto";
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

function Icon({ iconName, menuName }) {
  return (
    <>
      <IconStyle.IconContainer>
        <IconStyle.Icon />
        <IconStyle.MenuText>{menuName}</IconStyle.MenuText>
      </IconStyle.IconContainer>
      <IconStyle.IconContainer>
        <AccountCircle size="30" title="Circle" />
        <IconStyle.MenuText>Circle</IconStyle.MenuText>
      </IconStyle.IconContainer>
    </>
  );
}

export default Icon;
