const SET_IS_MODAL_ENTER_OPENED = 'SET_IS_MODAL_ENTER_OPENED';
const SET_IS_MODAL_EXIT_OPENED = 'SET_IS_MODAL_EXIT_OPENED';

const defaultState = {
  modalEnter: { opened: false, data: {} },
  modalExit: { opened: false, data: {} },
};

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_MODAL_ENTER_OPENED:
      return {
        ...state,
        modalEnter: { opened: !state.modalEnter.opened, data: action.payload },
      };
    case SET_IS_MODAL_EXIT_OPENED:
      return {
        ...state,
        modalExit: { opened: !state.modalExit.opened, data: action.payload },
      };
    default:
      return state;
  }
};

export const setIsModalEnterOpened = (payload?: any) => ({
  type: SET_IS_MODAL_ENTER_OPENED,
  payload,
});
export const setIsModalExitOpened = (payload?: any) => ({
  type: SET_IS_MODAL_EXIT_OPENED,
  payload,
});

export default modalReducer;
