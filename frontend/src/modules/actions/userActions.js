import { SET_USER, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const LoginAction = (userData) => (dispatch) => {
  console.log('success login action', userData);
  localStorage.setItem('user', JSON.stringify(userData)); //setting token to local storage
  localStorage.setItem('nickName', userData.member.name); //setting nickName to local storage
  dispatch({
    type: SET_USER,
    payload: userData,
  });
  // window.location.href = '/';
};

export const logoutUserAction = (dispatch) => {
  localStorage.removeItem('user'); // user 정보 초기화
  localStorage.removeItem('nickName'); // nickName 초기화
  localStorage.removeItem('persist:root'); // redux 초기화
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = '/';
};
