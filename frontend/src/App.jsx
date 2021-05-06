import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// pages
import Home from './views/Home';
import MyPage from './views/MyPage';
import MyPageList from './views/MyPageList';

// container
import NavBar from './containers/NavBar';

// components
import TestArea from './components/common/TestArea';
// import { PrivateRoute } from './utils/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLocationEditor, setIsLocationEditor] = useState(false);

  // router의 위치가 변화면 실행
  // eslint-disable-next-line
  useEffect(() => {
    setIsLocationEditor(location.pathname === '/editor' ? true : false);
    console.log('현재위치는', location.pathname);
  });

  // 로그인 상태 알기
  const CheckAuthentication = () => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(user ? true : false);
  };

  useEffect(() => {
    CheckAuthentication();
    console.log(`AuthCheckTriger isLoggedIn = `, isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {!isLocationEditor && <NavBar isLoggedIn={isLoggedIn} />}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/testarea" component={TestArea} />
        <Route path="/mypagelist" component={MyPageList} />
        <Route path="/mypage" component={MyPage} />
        {/* <PrivateRoute /> */}
      </Switch>
    </>
  );
}

export default withRouter(App);
