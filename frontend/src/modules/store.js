import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import roomReducer from './reducers/roomReducer';
import documentReducer from './reducers/documentReducer';
import commentReducer from './reducers/commentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
  document: documentReducer,
  room: roomReducer,
  comment: commentReducer,
});

export default rootReducer;
