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
      console.log(newData);
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

const data = {
  commentId: 'e1c20e31-8c55-4b92-90ee-967c0567213f',
  nickname: '임시 닉네임',
  content: '진우 정신 안차린다\n',
  agree: {
    count: 0,
    members: [],
  },
  createdDate: '2021-05-15T21:14:43.137947',
  lastModifiedDate: '2021-05-15T21:14:43.137947',
};
