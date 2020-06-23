import MessagingApi from '../api/messagingSystem';

import * as actionType from '../store/actionTypes';
import { getItemFromLocalStorage } from './authActions';
import { errorHandler } from './application';

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
          Authorization: getItemFromLocalStorage('token'),
          'Content-type': 'Application/json',
        },
      }
    )
      .then((res) => dispatch(createMessageSuccess()))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

export const getUsers = () => {
  return (dispatch) => {
    MessagingApi.get('users/', {
      headers: {
        Authorization: getItemFromLocalStorage('token'),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getAllUser(res)))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

export const messageCreatedSuccessfully = () => {
  return {
    type: actionType.MESSAGE_CREATED_SUCCESSFULLY,
    payload: { sentMessageSuccess: false },
  };
};

const createMessageSuccess = () => {
  return {
    type: actionType.CREATE_MESSAGE,
    payload: { sentMessageSuccess: true },
  };
};

const getAllUser = (res) => {
  return {
    type: actionType.GET_USERS,
    payload: { users: res.data.data },
  };
};
