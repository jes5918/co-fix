import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Home from "./views/Home";
import Editor from "./views/Editor";
import TemplatePage from "./views/TemplatePage";
import MyTemplatePage from "./views/MyTemplatePage";

// container
import NavBar from "./containers/NavBar";

// components
import GlobalFonts from "./assets/fonts/font";
import GlobalStyles from "./styles/GlobalStyle";
import TestArea from "./components/common/TestArea";
import Toggle from "./components/common/Toggle";
import { CheckAuthentication } from "./utils/checkAuthentication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(CheckAuthentication());
  }, [CheckAuthentication()]);

  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <Router>
        <NavBar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/testarea" component={TestArea} />
          <Route path="/toggle" component={Toggle} />
          <Route path="/editor" component={Editor} />
          <Route path="/template" component={TemplatePage} />
          <Route path="/mytemplate" component={MyTemplatePage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
