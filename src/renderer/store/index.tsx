import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import controlsReducer from './reducers/controlsReducer';
import modalReducer from './reducers/modalReducer';

const rootReducer = combineReducers({
  controls: controlsReducer,
  modal: modalReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
