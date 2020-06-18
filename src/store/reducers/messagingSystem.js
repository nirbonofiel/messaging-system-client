import * as actionType from '../actionTypes';
import { User } from '../../models/user';

const initialState = {
  sentMessageSeccuess: false,
  users: [],
  me: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        sentMessageSeccuess: action.payload.sentMessageSeccuess,
      };
    case actionType.GET_USERS:
      const users = action.payload.users.map((user) => {
        const currUser = new User(user.id, user.username);
        return currUser;
      });
      return {
        ...state,
        users: users,
      };
    case actionType.GET_ME:
      const user = new User(action.payload.me.id, action.payload.me.username);
      return {
        ...state,
        me: user,
      };
    default:
      return state;
  }
};

export default reducer;
