import { SET_MYPAGELIST, UPDATE_MYPAGELIST_ITEM } from '../types';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MYPAGELIST:
      return {
        data: action.payload,
      };
    case UPDATE_MYPAGELIST_ITEM: {
      const index = state.data.findIndex(
        (roomInfo) => roomInfo.roomId === action.payload.roomId,
      );
      const newData = [...state.data];
      newData[index] = action.payload;
      newData[index].status = 'CLOSE';
      return { ...state, data: newData };
    }
    default:
      return state;
  }
}
