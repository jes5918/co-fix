import { SET_MYPAGELIST, UPDATE_MYPAGELIST_ITEM } from '../types';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MYPAGELIST:
      return [...action.payload];
    case UPDATE_MYPAGELIST_ITEM: {
      const index = state.findIndex(
        (roomInfo) => roomInfo.roomId === action.payload.roomId,
      );
      const newData = [...state];
      newData[index] = action.payload;
      newData[index].status = 'CLOSED';
      return [...newData];
    }
    default:
      return state;
  }
}
