import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';
const initialState = {};
const middleware = [thunk];

//this is for redux devtool purpose
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;

export type RootState = ReturnType<typeof reducer>;
