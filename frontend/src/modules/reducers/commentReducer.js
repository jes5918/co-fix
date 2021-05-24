import {
  SET_COMMENT_TEXT,
  CREATE_COMMENT_TEXT,
  AGREE_COMMENT_TEXT,
  RESET_COMMENT_TEXT,
} from '../types';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COMMENT_TEXT:
      return {
        data: action.payload,
      };
    case CREATE_COMMENT_TEXT:
      return {
        data: [...state.data, action.payload],
      };
    case AGREE_COMMENT_TEXT: {
      const index = state.data.findIndex(
        (comment) => comment.commentId === action.payload.commentId,
      );
      const newData = [...state.data];
      newData[index] = action.payload;
      return { data: newData };
    }
    case RESET_COMMENT_TEXT: {
      return initialState;
    }
    default:
      return state;
  }
}