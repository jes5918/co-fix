// Roll : 편집 화면에서 좌측 인풋 객체들의 전체 상태를 관리함.

import React from 'react';
import { useSelector } from 'react-redux';
import EditableTextWrapper from '../components/innerDocumentElements/EditableTextWrapper';

function DocumentContainer(props) {
  const datas = useSelector((state) => {
    return state.document.statements;
  });

  return (
    <>
      {datas &&
        datas.map((data, idx) => {
          return <EditableTextWrapper key={idx} data={data} />;
        })}
    </>
  );
}

export default DocumentContainer;
