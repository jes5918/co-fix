// Roll : 편집 화면에서 좌측 인풋 객체들의 전체 상태를 관리함.

import React from 'react';
import { useSelector } from 'react-redux';
import EditableTextWrapper from '../components/innerDocumentElements/EditableTextWrapper';

function DocumentContainer({ sentences, testRequest, onHandleClickSentence }) {
  // const datas = useSelector((state) => {
  //   return state.document.data;
  // });

  return (
    <>
      {sentences &&
        sentences.map((data, idx) => {
          return (
            <EditableTextWrapper
              key={idx}
              data={data}
              testRequest={testRequest}
              onHandleClickSentence={onHandleClickSentence}
            />
          );
        })}
    </>
  );
}

export default DocumentContainer;
