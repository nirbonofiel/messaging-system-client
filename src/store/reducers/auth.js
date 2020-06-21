import * as actionType from '../actionTypes';

const initialState = {
  isAuthticated: false,
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
        isAuthticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
