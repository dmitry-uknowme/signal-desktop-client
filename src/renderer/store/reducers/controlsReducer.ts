const SET_IS_DOOR1_OPENED = 'SET_IS_DOOR1_OPENED';
const SET_IS_DOOR2_OPENED = 'SET_IS_DOOR2_OPENED';
const SET_IS_MANUAL_MODE = 'SET_IS_MANUAL_MODE';

const defaultState = {
  door1: false,
  door2: false,
  isManualMode: true,
};

const controlsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_DOOR1_OPENED:
      return { ...state, door1: !state.door1 };
    case SET_IS_DOOR2_OPENED:
      return { ...state, door2: !state.door2 };
    case SET_IS_MANUAL_MODE:
      return { ...state, isManualMode: !state.isManualMode };
    default:
      return state;
  }
};

export const setIsDoor1Opened = () => ({
  type: SET_IS_DOOR1_OPENED,
});

export const setIsDoor2Opened = () => ({
  type: SET_IS_DOOR2_OPENED,
});

export const setIsManualMode = () => ({
  type: SET_IS_MANUAL_MODE,
});

export default controlsReducer;
