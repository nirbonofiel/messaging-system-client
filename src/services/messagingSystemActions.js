import MessagingApi from '../api/messagingSystem';

import * as actionType from '../store/actionTypes';

const token =
  'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6Im1lc3NhZ2luZ19zeXN0ZW1fYWRtaW4iLCJleHAiOjE1OTI5MjA2MjEsImVtYWlsIjoiIiwib3JpZ19pYXQiOjE1OTIzMTU4MjF9.iqAxJ8gWlaWVcXURQPt0p8zj5BMYSV4vNz4uXAsntwk';

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
          Authorization: token,
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
        Authorization: token,
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
        Authorization: token,
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
