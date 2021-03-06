import MessagingApi from '../api/messagingSystem';
import { getItemFromLocalStorage } from './authActions';

import * as actionType from '../store/actionTypes';
import { errorHandler } from './application';

export const getMessages = (userId) => {
  return (dispatch) => {
    MessagingApi.get('messages/user/', {
      headers: {
        Authorization: getItemFromLocalStorage('token'),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getUserMessages(res, userId)))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

export const deleteMessage = (messageId) => {
  return (dispatch) => {
    MessagingApi.delete(`messages/${messageId}/`, {
      headers: {
        Authorization: getItemFromLocalStorage('token'),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(deleteUserMessage(messageId)))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

export const getMessage = (messageId) => {
  return (dispatch) => {
    MessagingApi.get(`messages/${messageId}/`, {
      headers: {
        Authorization: getItemFromLocalStorage('token'),
        'Content-type': 'Application/json',
      },
    })
      .then((res) => dispatch(getUserMessage(res)))
      .catch((err) => dispatch(errorHandler('Something went wrong')));
  };
};

export const changeTabType = (type) => {
  return {
    type: actionType.CHANGE_TAB_TYPE,
    payload: { type: type },
  };
};

const getUserMessages = (res, userId) => {
  return {
    type: actionType.GET_USER_MESSAGES,
    payload: { messages: res.data.data, userId: userId },
  };
};

const deleteUserMessage = (messageId) => {
  return {
    type: actionType.DELETE_MESSAGE,
    payload: { messageId: messageId },
  };
};

const getUserMessage = (res) => {
  return {
    type: actionType.GET_MESSAGE,
    payload: { message: res.data.data },
  };
};
