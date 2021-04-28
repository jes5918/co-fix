import React from "react";
import styled from "styled-components";
import { HiCheck } from "react-icons/hi";

const CheckboxContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin: 24px auto;
`;

const LabelText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
`;

const Icon = styled(HiCheck)`
  position: absolute;
  top: -13px;
  left: 1px;
  width: 22px;
  color: rgba(255, 255, 255, 1);
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

const StyledCheckbox = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  background: ${(props) => (props.checked ? "#ff9500" : "papayawhip")};
  border-radius: 3px;
  transition: all 200ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3.5px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const CheckBox = ({
  className,
  checked,
  labelWrap = true,
  children,
  ...props
}) => {
  const content = (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon />
      </StyledCheckbox>
      <LabelText>{children}</LabelText>
    </CheckboxContainer>
  );

  return labelWrap ? <label>{content}</label> : <>{content}</>;
};

export default CheckBox;
