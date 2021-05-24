import { SET_USER, SET_UNAUTHENTICATED } from '../types';

export const LoginAction = (userData) => (dispatch) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('nickName', userData.member.name);
  dispatch({
    type: SET_USER,
    payload: userData,
  });
};

export const logoutUserAction = (dispatch) => {
  localStorage.removeItem('user');
  localStorage.removeItem('nickName');
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = '/';
};
