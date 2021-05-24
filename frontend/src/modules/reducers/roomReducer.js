import {
  SET_ROOM_INFO,
  RESET_ROOM_INFO,
  UPDATE_ROOM_INFO,
  UPDATE_MEMBER_LIST,
} from '../types';

const initialState = {
  roomId: '',
  memberId: 0,
  roomTitle: '',
  memberLimit: 0,
  documentId: '',
  members: [],
  pinNumber: '',
  status: '',
  createdDate: '',
  lastModifiedDate: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_INFO:
      return { ...action.payload };
    case RESET_ROOM_INFO:
      return initialState;
    case UPDATE_ROOM_INFO:
      if (state.roomId == action.payload.roomId) {
        return {
          ...state,
          roomTitle: action.payload.title,
          memberLimit: action.payload.maxcnt,
        };
      } else return state;
    case UPDATE_MEMBER_LIST:
      return {
        ...state,
        members: action.payload,
      };
    default:
      return state;
  }
}
