import * as actionType from '../store/actionTypes';

export const errorHandler = (errorMsg) => {
  return {
    type: actionType.ERROR_HANDLER,
    payload: { errorMsg: errorMsg },
  };
};

export const closeModalError = () => {
  return { type: actionType.HIDE_MODAL_ERROR };
};

export const closeModalMsg = () => {
  return { type: actionType.HIDE_MODAL_MSG };
};

export const openModalMsg = () => {
  return { type: actionType.OPEN_MODAL_MSG };
};
