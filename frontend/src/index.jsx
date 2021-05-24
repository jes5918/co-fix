import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// route를 App이 아닌 index로 뺀 이유 ===> history.location의 위치에 따른
// navbar의 상태를 변화시키기 위함
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// global style
import GlobalFonts from './assets/fonts/font';
import GlobalStyles from './styles/GlobalStyle';

// redux
import { Provider } from 'react-redux';

// redux가 브라우저가 꺼진 상태에서도 기억하고 다음번에 켜도 기억할 수 있도록 해주는 기능
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
const { store, persistor } = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalFonts />
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
