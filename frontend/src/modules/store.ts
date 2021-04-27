import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';

const rootReducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
