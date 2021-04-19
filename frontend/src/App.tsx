import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// container
import NavBar from './containers/NavBar';

// components
import Home from './views/Home';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
