const SET_IS_MODAL_ENTER_OPENED = 'SET_IS_MODAL_ENTER_OPENED';
const SET_IS_MODAL_EXIT_OPENED = 'SET_IS_MODAL_EXIT_OPENED';

const defaultState = {
  modalEnter: false,
  modalExit: false,
};

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_MODAL_ENTER_OPENED:
      return { ...state, modalEnter: action.payload };
    case SET_IS_MODAL_EXIT_OPENED:
      return { ...state, modalExit: action.payload };
    default:
      return state;
  }
};

export const setIsModalEnterOpened = (payload: boolean) => ({
  type: SET_IS_MODAL_ENTER_OPENED,
  payload,
});
export const setIsModalExitOpened = (payload: boolean) => ({
  type: SET_IS_MODAL_EXIT_OPENED,
  payload,
});

export default modalReducer;
