// Roll : 편집 화면에서 좌측 인풋 객체들의 전체 상태를 관리함.

import React from 'react';
import { useSelector } from 'react-redux';
import MyEditableTextWrapper from '../../components/mypage/MyEditableTextWrapper';

export default function MyDocumentContainer({
  setIsChanged,
  sentences,
  roomId,
  documentId,
  onHandleClickSentence,
  onFocusedSentenceId,
}) {
  return (
    <>
      {sentences &&
        sentences.map((sentence, idx) => {
          const isSelected =
            onFocusedSentenceId && onFocusedSentenceId === sentence.sentenceId;
          return (
            <MyEditableTextWrapper
              key={idx}
              isSelected={isSelected}
              setIsChanged={setIsChanged}
              sentence={sentence}
              roomId={roomId}
              documentId={documentId}
              onHandleClickSentence={onHandleClickSentence}
            />
          );
        })}
    </>
  );
}
