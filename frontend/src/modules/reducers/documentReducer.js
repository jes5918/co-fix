import {
  SET_DOCUMENT,
  MODIFY_DOCUMENT_TEXT,
  SELECT_DOCUMENT_TEXT,
  SET_DOCUMENT_TITLE,
} from '../types';

const initialState = {
  selectNum: 0,
  title: '',
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DOCUMENT_TITLE: {
      return { ...state, title: action.payload };
    }
    case SET_DOCUMENT: {
      return { ...state, data: action.payload };
    }
    case MODIFY_DOCUMENT_TEXT: {
      const index = state.data.findIndex(
        (text) => text.sentenceId === action.payload.sentenceId,
      );
      const newData = [...state.data];
      newData[index] = action.payload;
      return { ...state, data: newData };
    }
    case SELECT_DOCUMENT_TEXT: {
      return { ...state, selectNum: action.payload };
    }
    default:
      return state;
  }
}
