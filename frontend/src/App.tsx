import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// container
import NavBar from './containers/NavBar';
import TestArea from './components/common/TestArea';

// components
import Home from './views/Home';
import GlobalFonts from './assets/fonts/font';

import GlobalStyles from './styles/GlobalStyle';
function App() {
  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/testArea" component={TestArea} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
