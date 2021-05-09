import { SET_USER, SET_UNAUTHENTICATED } from '../types';
// import axios from 'axios';

export const LoginAction = (userData) => (dispatch) => {
  console.log('success google login action', userData);
  localStorage.setItem('user', JSON.stringify(userData)); //setting token to local storage
  dispatch({
    type: SET_USER,
    payload: userData,
  });
  window.location.href = '/template';
  // const token = `Bearer ${res.data.token}`;
  // axios.defaults.headers.common['Authorization'] = token; //setting authorize token to header in axios
};

export const logoutUserAction = (dispatch) => {
  localStorage.removeItem('user');
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = '/'; //redirect to login page
  // delete axios.defaults.headers.common['Authorization'];
};
