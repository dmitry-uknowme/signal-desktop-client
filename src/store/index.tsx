import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import gateReducer from "./reducers/gateReducer";
import modalReducer from "./reducers/modalReducer";
import carsReducer from "./reducers/carsReducer";

export const rootReducer = combineReducers({
  gate: gateReducer,
  modal: modalReducer,
  cars: carsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
