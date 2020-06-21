import MessagingApi from '../api/messagingSystem';

import * as actionType from '../store/actionTypes';

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
      .catch((err) => console.log('Something went wrong'));
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

export const getToken = () => {
  return localStorage.getItem('token');
};
