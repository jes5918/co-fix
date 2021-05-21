import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../modules/store';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(
    presistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
