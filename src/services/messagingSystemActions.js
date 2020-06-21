import MessagingApi from '../api/messagingSystem';

import * as actionType from '../store/actionTypes';
import { getToken } from './authActions';

export const createMessage = (message) => {
  return (dispatch) => {
    MessagingApi.post(
      'messages/',
      {
        body: message.body,
        subject: message.subject,
        sender: message.sender,
        receiver: message.receiver,
      },
      {
        headers: {
          Authorization: getToken(),
          'Content-type': 'Application/json',
        },
      }
    )
      .then((res) => dispatch(createMessageSuccess()))
      .catch((err) => console.log('Something went wrong'));
  };
};

export const getUsers = () => {
  return (dispatch) => {
    MessagingApi.get('users/', {
      headers: {
        Authorization: getToken(),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getAllUser(res)))
      .catch((err) => console.log('Something went wrong'));
  };
};

export const getMe = () => {
  return (dispatch) => {
    MessagingApi.get('users/me/', {
      headers: {
        Authorization: getToken(),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getUserMe(res)))
      .catch((err) => console.log('Something went wrong'));
  };
};

const createMessageSuccess = () => {
  return {
    type: actionType.CREATE_MESSAGE_SUCCESS,
    payload: { sentMessageSeccuess: true },
  };
};

const getAllUser = (res) => {
  return {
    type: actionType.GET_USERS,
    payload: { users: res.data.data },
  };
};

const getUserMe = (res) => {
  return {
    type: actionType.GET_ME,
    payload: { me: res.data.data },
  };
};
