import MessagingApi from '../api/messagingSystem';

import * as actionType from '../store/actionTypes';
import { errorHandler } from './application';

export const login = (data) => {
  return (dispatch) => {
    MessagingApi.post(
      'login/',
      {
        username: data.username,
        password: data.password,
      },
      {
        headers: {
          'Content-type': 'Application/json',
        },
      }
    )
      .then((res) => dispatch(setToken(res)))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

export const getMe = () => {
  return (dispatch) => {
    MessagingApi.get('users/me/', {
      headers: {
        Authorization: getItemFromLocalStorage('token'),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getUserMe(res)))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

const setToken = (res) => {
  const token = `JWT ${res.data.data.token}`;
  localStorage.setItem('token', token);

  return {
    type: actionType.LOGIN,
    payload: { isAuthticated: true },
  };
};

export const getItemFromLocalStorage = (item) => {
  return localStorage.getItem(item);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  return {
    type: actionType.LOGOUT,
    payload: { isAuthticated: false },
  };
};

const getUserMe = (res) => {
  const user = res.data.data;
  localStorage.setItem('user_id', user.id);
  return {
    type: actionType.GET_ME,
    payload: { me: user },
  };
};
