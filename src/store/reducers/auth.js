import * as actionType from '../actionTypes';
import { User } from '../../models/user';

const initialState = {
  isAuthticated: false,
  me: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN:
      return {
        ...state,
        isAuthticated: action.payload.isAuthticated,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isAuthticated: action.payload.isAuthticated,
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
