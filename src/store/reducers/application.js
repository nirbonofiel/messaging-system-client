import * as actionType from '../actionTypes';

const initialState = {
  errorMsg: null,
  modalShow: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ERROR_HANDLER:
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
        modalShow: true,
      };
    case actionType.OPEN_MODAL_MSG:
      return {
        ...state,
        modalShow: true,
      };
    case actionType.HIDE_MODAL_ERROR:
      return {
        ...state,
        errorMsg: null,
        modalShow: false,
      };
    case actionType.HIDE_MODAL_MSG:
      return {
        ...state,
        modalShow: false,
      };
    default:
      return state;
  }
};

export default reducer;
