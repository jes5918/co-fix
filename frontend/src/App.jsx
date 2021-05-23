import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, useHistory } from 'react-router-dom';

// hooks
import useLoginUser from './hook/useLoginUser';

// pages
import Home from './views/Home';
import MyPage from './views/MyPage';
import MyPageList from './views/MyPageList';
import Create from './views/Create';
import Join from './views/Join';
import CommonWorkPage from './views/CommonWorkPage';

// container
import NavBar from './containers/NavBar';

// utils - HOC router
import { PrivateRoute } from './utils/privateRoute';
import { NickNameRoute } from './utils/nickNameRoute';

function App() {
  const user = useLoginUser();
  const history = useHistory();
  const [isCoFixRoom, setIsCoFixRoom] = useState(false);
  const [isNoLogo, setIsNoLogo] = useState(false);

  useEffect(() => {
    setIsCoFixRoom(
      history.location.pathname.startsWith('/co-fix/') ? true : false,
    );
    setIsNoLogo(
      history.location.pathname.startsWith('/history') ||
        history.location.pathname.startsWith('/mypage')
        ? true
        : false,
    );
  }, [history.location.pathname]);

  return (
    <>
      {!isCoFixRoom && (
        <NavBar
          isLoggedIn={
            user.authenticated && JSON.parse(localStorage.getItem('user'))
              ? true
              : false
          }
          user={user && user.credentials.member}
          isNoLogo={isNoLogo}
        />
      )}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/join" component={Join} />
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute path="/history" component={MyPageList} />
        <PrivateRoute path="/mypage/:roomid/:documentid" component={MyPage} />
        <NickNameRoute path="/co-fix/:id" component={CommonWorkPage} />
      </Switch>
    </>
  );
}

export default withRouter(App);
