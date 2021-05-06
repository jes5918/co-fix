import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// pages
import Home from './views/Home';
import MyPage from './views/MyPage';
import MyPageList from './views/MyPageList';
import CreatePjt from './views/CreatePjt';

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
      <NavBar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/testarea" component={TestArea} />
        <Route path="/mypagelist" component={MyPageList} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/create" component={CreatePjt} />
        {/* <PrivateRoute /> */}
      </Switch>
    </>
  );
}

export default withRouter(App);
