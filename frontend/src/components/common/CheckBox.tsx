import React from 'react';
import styled from 'styled-components';
import { HiCheck } from 'react-icons/hi';

const CheckboxContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin: 8px auto;
`;

const LabelText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 8px;
  color: rgba(0, 0, 0, 0.6);
`;

const Icon = styled(HiCheck)`
  position: absolute;
  top: -17px;
  left: 1px;
  width: 15px;
  color: rgba(255, 255, 255, 1);
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? '#ff9500' : 'papayawhip')};
  border-radius: 3px;
  transition: all 200ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2.5px pink;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

interface IProps {
  className?: string;
  children?: React.ReactNode;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelWrap?: boolean;
}

const CheckBox: React.FC<IProps> = ({
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
