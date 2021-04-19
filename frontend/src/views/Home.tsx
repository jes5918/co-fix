import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import GoogleAuth from '../components/login/GoogleAuth';
import Layer from '../containers/Layer';

interface MatchParams {
  id: string;
}

function Home({ match }: RouteComponentProps<MatchParams>) {
  const { id } = match.params;
  console.log(match);
  return (
    <>
      <div>여긴 홈</div>
      <div>{id}</div>
      <Layer />
      <GoogleAuth />
    </>
  );
}

export default Home;
