import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useLoginUser from './hook/useLoginUser';
import styled from 'styled-components';
import AnimatedCursor from 'react-animated-cursor';

// pages
import Home from './views/Home';
import MyPage from './views/MyPage';
import MyPageList from './views/MyPageList';
import Create from './views/Create';
import Join from './views/Join';
import CommonWorkPage from './views/CommonWorkPage';
import OpenviduTest from './views/OpenviduTest';

// container
import NavBar from './containers/NavBar';

// components
// import { PrivateRoute } from './utils/PrivateRoute';

function App() {
  const user = useLoginUser();

  return (
    <>
      <NavBar
        isLoggedIn={user.authenticated ? true : false}
        user={user.credentials.member}
      />
      {/* <AnimatedCursor
        innerSize={20}
        outerSize={20}
        color="220, 110, 90"
        outerAlpha={0.1}
        innerScale={0.8}
        outerScale={4} 
      /> */}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/mypagelist" component={MyPageList} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/create" component={Create} />
        <Route path="/join" component={Join} />
        <Route path="/co-fix/:id" component={CommonWorkPage} />
        <Route path="/openvidutest" component={OpenviduTest} />
        {/* <PrivateRoute /> */}
      </Switch>
    </>
  );
}

export default withRouter(App);
