import { SET_ROOM_INFO, RESET_ROOM_INFO, UPDATE_ROOM_INFO } from '../types';

const initialState = {
  roomId: '',
  memberId: 0,
  roomTitle: '',
  memberLimit: 0,
  documentId: '',
  pinNumber: '',
  status: '',
  createdDate: '',
  lastModifiedDate: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_INFO:
      return {
        roomId: action.payload.roomId,
        memberId: action.payload.memberId,
        roomTitle: action.payload.roomTitle,
        memberLimit: action.payload.memberLimit,
        documentId: action.payload.documentId,
        pinNumber: action.payload.pinNumber,
        status: action.payload.status,
        createdDate: action.payload.createdDate,
        lastModifiedDate: action.payload.lastModifiedDate,
      };
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
    default:
      return state;
  }
}
