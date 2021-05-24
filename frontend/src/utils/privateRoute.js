import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useLoginUser from '../hook/useLoginUser';

function PrivateRoute({ component: Component, roles, ...rest }) {
  const { credentials } = useLoginUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('user') || !credentials.member) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
