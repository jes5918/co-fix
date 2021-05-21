import { SET_MYPAGELIST, UPDATE_MYPAGELIST_ITEM } from '../types';

export const setMyPageList = (Data) => (dispatch) => {
  dispatch({
    type: SET_MYPAGELIST,
    payload: Data,
  });
};

export const updateMyPageList = (Data) => (dispatch) => {
  dispatch({
    type: UPDATE_MYPAGELIST_ITEM,
    payload: Data,
  });
};
