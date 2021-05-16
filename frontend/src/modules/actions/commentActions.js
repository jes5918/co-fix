import {
  SET_COMMENT_TEXT,
  CREATE_COMMENT_TEXT,
  AGREE_COMMENT_TEXT,
} from '../types';

export const commentSetAction = (Data) => (dispatch) => {
  dispatch({
    type: SET_COMMENT_TEXT,
    payload: Data,
  });
};

export const commentCreateAction = (Data) => (dispatch) => {
  dispatch({
    type: CREATE_COMMENT_TEXT,
    payload: Data,
  });
};

export const commentAgreeAction = (comment) => (dispatch) => {
  dispatch({
    type: AGREE_COMMENT_TEXT,
    payload: comment,
  });
};
