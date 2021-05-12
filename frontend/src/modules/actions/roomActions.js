import { SET_ROOM_INFO, RESET_ROOM_INFO, SET_DOCUMENT_TITLE } from '../types';
export const saveRoomInfo = (Data) => (dispatch) => {
  dispatch({
    type: SET_DOCUMENT_TITLE,
    payload: Data.roomTitle,
  });
  dispatch({
    type: SET_ROOM_INFO,
    payload: Data,
  });
};

export const resetRoomInfo = () => (dispatch) => {
  dispatch({
    type: RESET_ROOM_INFO,
  });
};
