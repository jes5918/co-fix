import { SET_USER, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';
import { UserGraduate } from '@styled-icons/fa-solid';

export const LoginAction = (userData) => (dispatch) => {
  console.log('success login action', userData);
  localStorage.setItem('user', JSON.stringify(userData)); //setting token to local storage
  localStorage.setItem('nickName', userData.member.name); //setting token to local storage
  dispatch({
    type: SET_USER,
    payload: userData,
  });
  if (userData.token) {
    const token = `Bearer ${userData.token}`;
    axios.defaults.headers.common['Authorization'] = token; //setting authorize token to header in axios
  }
  window.location.href = '/';
};

export const logoutUserAction = (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('nickName');
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  delete axios.defaults.headers.common['Authorization'];
  window.location.href = '/';
};
