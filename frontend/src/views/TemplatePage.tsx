import TemplateBody from 'containers/template/TemplateBody';
import TemplateHeader from 'containers/template/TemplateHeader';
import TemplateSearch from 'containers/template/TemplateSearch';
import React from 'react';
import styled from 'styled-components';

const TemplatePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

const HeaderSpan = styled.div`
  margin: 0px auto 30px;
`;
interface Props {}

function TemplatePage(props: Props) {
  const {} = props;

  return (
    <TemplatePageWrapper>
      <TemplateHeader>
        <HeaderSpan>마음에 드는 템플릿을 검색하세요.</HeaderSpan>
        <TemplateSearch />
      </TemplateHeader>
      <TemplateBody />
    </TemplatePageWrapper>
  );
}

export default TemplatePage;
