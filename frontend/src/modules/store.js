import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import roomReducer from './reducers/roomReducer';
import documentReducer from './reducers/documentReducer';
import commentReducer from './reducers/commentReducer';
import mypageReducer from './reducers/mypageReducer';

const rootReducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
  document: documentReducer,
  room: roomReducer,
  comment: commentReducer,
  mypagelist: mypageReducer,
});

export default rootReducer;
