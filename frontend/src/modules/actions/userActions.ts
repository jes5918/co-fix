import { SET_USER, SET_UNAUTHENTICATED } from '../types';
// import axios from 'axios';

export const LoginAction = (userData: any) => (dispatch: any) => {
  console.log('success google login action', userData);
  localStorage.setItem('user', JSON.stringify(userData)); //setting token to local storage
  dispatch({
    type: SET_USER,
    payload: userData,
  });
  // const token = `Bearer ${res.data.token}`;
  // axios.defaults.headers.common['Authorization'] = token; //setting authorize token to header in axios
};

export const logoutUserAction = (dispatch: any) => {
  console.log(`로그아웃 액션`);
  localStorage.removeItem('user');
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = '/'; //redirect to login page
  // delete axios.defaults.headers.common['Authorization'];
};
