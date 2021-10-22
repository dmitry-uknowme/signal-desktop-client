const SET_IS_DOOR1_OPENED = 'SET_IS_DOOR1_OPENED';
const SET_IS_DOOR2_OPENED = 'SET_IS_DOOR2_OPENED';
const SET_IS_MANUAL_MODE = 'SET_IS_MANUAL_MODE';

const defaultState = {
  door1: false,
  door2: false,
  isManualMode: false,
};

const controlsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_DOOR1_OPENED:
      return { ...state, door1: action.payload };
    case SET_IS_DOOR2_OPENED:
      return { ...state, door2: action.payload };
    case SET_IS_MANUAL_MODE:
      return { ...state, isManualMode: action.payload };
    default:
      return state;
  }
};

export const setIsDoor1Opened = (payload: boolean) => ({
  type: SET_IS_DOOR1_OPENED,
  payload,
});

export const setIsDoor2Opened = (payload: boolean) => ({
  type: SET_IS_DOOR2_OPENED,
  payload,
});

export const setIsManualMode = (payload: boolean) => ({
  type: SET_IS_MANUAL_MODE,
  payload,
});

export default controlsReducer;
