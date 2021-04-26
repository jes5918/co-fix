import TemplateBody from 'containers/template/TemplateBody';
import TemplateHeader from 'containers/template/TemplateHeader';
import React from 'react';
import styled from 'styled-components';

const MyTemplatePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

interface Props {}

function MyTemplatePage(props: Props) {
  const {} = props;

  return (
    <MyTemplatePageWrapper>
      <TemplateHeader>
        방금 죽은 개복치 님이
        <tr /> 찜한 템플릿 목록입니다.
      </TemplateHeader>
      <TemplateBody />
    </MyTemplatePageWrapper>
  );
}

export default MyTemplatePage;
