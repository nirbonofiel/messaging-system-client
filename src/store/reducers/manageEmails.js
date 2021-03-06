import * as actionType from '../actionTypes';
import { Message } from '../../models/message';

const initialState = {
  sent: [],
  inbox: [],
  currMessage: null,
  type: 'inbox',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER_MESSAGES:
      const sentMessages = [];
      const inboxMessages = [];

      for (var i = 0; i < action.payload.messages.length; i++) {
        if (action.payload.messages[i].sender.id === +action.payload.userId) {
          sentMessages.push(
            new Message(
              action.payload.messages[i].id,
              action.payload.messages[i].sender,
              action.payload.messages[i].receiver,
              action.payload.messages[i].body,
              action.payload.messages[i].subject,
              action.payload.messages[i].creation_date
            )
          );
        } else {
          inboxMessages.push(
            new Message(
              action.payload.messages[i].id,
              action.payload.messages[i].sender,
              action.payload.messages[i].receiver,
              action.payload.messages[i].body,
              action.payload.messages[i].subject,
              action.payload.messages[i].creation_date
            )
          );
        }
      }
      return {
        ...state,
        sent: sentMessages,
        inbox: inboxMessages,
      };
    case actionType.DELETE_MESSAGE:
      let updatedSent = state.sent;
      let updatedInbox = state.inbox;
      if (state.type === 'inbox') {
        updatedInbox = state.inbox.filter(
          (item) => item.id !== action.payload.messageId
        );
      } else {
        updatedSent = state.sent.filter(
          (item) => item.id !== action.payload.messageId
        );
      }
      return {
        ...state,
        sent: updatedSent,
        inbox: updatedInbox,
      };
    case actionType.GET_MESSAGE:
      return {
        ...state,
        currMessage: action.payload.message,
      };
    case actionType.CHANGE_TAB_TYPE:
      return {
        ...state,
        type: action.payload.type,
      };

    default:
      return state;
  }
};

export default reducer;
