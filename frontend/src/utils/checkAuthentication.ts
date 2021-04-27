import { logoutUser, getUserData } from '../modules/actions/userActions';
import store from '../modules/store';
import axios from 'axios';
import { SET_AUTHENTICATED } from '../modules/types';

export const CheckAuthentication = () => {
  const userToken = localStorage.token;
  if (userToken) {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = userToken;
    store.dispatch(getUserData());
  }
};
