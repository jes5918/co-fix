import {
  SET_DOCUMENT,
  MODIFY_DOCUMENT_TEXT,
  SELECT_DOCUMENT_TEXT,
  SET_DOCUMENT_TITLE,
  UPDATE_COMMENT_EXIST,
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
      if (state.data.length > 0 && action.payload) {
        const index = state.data.findIndex(
          (text) => text.sentenceId === action.payload.sentenceId,
        );
        const newData = [...state.data];
        newData[index] = action.payload;
        return { ...state, data: newData };
      } else {
        return state;
      }
    }
    case SELECT_DOCUMENT_TEXT: {
      return { ...state, selectNum: action.payload };
    }
    case UPDATE_COMMENT_EXIST: {
      const updateIndex = state.data.findIndex(
        (sentence) => sentence.sentenceId === action.sentence,
      );
      const newData = [...state.data];
      newData[updateIndex] = { ...state.data[updateIndex], hasComment: true };
      return { ...state, data: newData };
    }
    default:
      return state;
  }
}
