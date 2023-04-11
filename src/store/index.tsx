import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gateReducer from "./reducers/gateReducer";
import modalReducer from "./reducers/modalReducer";
import carsReducer from "./reducers/carsReducer";
import settingsReducer from "./reducers/settingsReducer";

export const rootReducer = combineReducers({
  gate: gateReducer,
  modal: modalReducer,
  cars: carsReducer,
  settings: settingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
