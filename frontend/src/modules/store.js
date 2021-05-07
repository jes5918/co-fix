import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
import documentReducer from './reducers/documentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
  document: documentReducer,
});

export default rootReducer;
