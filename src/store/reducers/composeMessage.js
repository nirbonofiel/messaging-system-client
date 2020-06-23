import * as actionType from '../actionTypes';
import { User } from '../../models/user';

const initialState = {
  sentMessageSuccess: false,
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_MESSAGE:
      return {
        ...state,
        sentMessageSuccess: action.payload.sentMessageSuccess,
      };
    case actionType.MESSAGE_CREATED_SUCCESSFULLY:
      return {
        ...state,
        sentMessageSuccess: action.payload.sentMessageSuccess,
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

    default:
      return state;
  }
};

export default reducer;
