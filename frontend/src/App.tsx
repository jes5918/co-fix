import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// container
import NavBar from './containers/NavBar';
import Card from './components/common/Card';

// components
import Home from './views/Home';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/card" component={Card} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
