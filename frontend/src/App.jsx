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
  const history = useHistory();
  const user = useLoginUser();
  const [isNoLogo, setIsNoLogo] = useState(false);
  const [isCoFixRoom, setIsCoFixRoom] = useState(false);

  // 로그인 상태 확인 redux && localStorage 중첩확인용
  const isLoggedIn =
    user.authenticated && JSON.parse(localStorage.getItem('user'))
      ? true
      : false;

  // route의 위치에 따라서 navbar에 logo, items의 유무를 결정하가 위한 hook
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
          isLoggedIn={isLoggedIn}
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
        <NickNameRoute
          path="/co-fix/:id"
          component={CommonWorkPage}
          isCoFixRoom={isCoFixRoom}
        />
      </Switch>
    </>
  );
}

export default withRouter(App);
