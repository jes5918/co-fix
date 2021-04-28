import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../modules/store';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'reducer',
  storage,
  whitelist: ['reducer'],
};

export default function configureStore() {
  const presistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    presistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
