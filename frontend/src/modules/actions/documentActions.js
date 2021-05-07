import { MODIFY_DOCUMENT_TEXT, SELECT_DOCUMENT_TEXT } from '../types';

// 문장 수정하면 redux에 저장하기 위해 사용하는 action 함수
export const documentModifyAction = (Data) => (dispatch) => {
  dispatch({
    type: MODIFY_DOCUMENT_TEXT,
    payload: Data,
  });
};

// 문장 클릭하면 redux에 클릭한 문장 저장하는 action 함수
export const documentSelectAction = (Num) => (dispatch) => {
  dispatch({
    type: SELECT_DOCUMENT_TEXT,
    payload: Num,
  });
};
