/* eslint-disable no-case-declarations */

import {
  AllCarsActionTypes,
  CarAction,
  CarsOnTerritoryActionTypes,
} from '../types/car';

const defaultState = {
  all: [],
  on_territory: [],
};

const carReducer = (state = defaultState, action: CarAction) => {
  switch (action.type) {
    case AllCarsActionTypes.FETCH:
      return { ...state, all: action.payload };

    case AllCarsActionTypes.ADD_CAR:
      return {
        ...state,
        all: [...state.all, action.payload],
      };

    case CarsOnTerritoryActionTypes.FETCH:
      return { ...state, on_territory: action.payload };

    case CarsOnTerritoryActionTypes.ADD_CAR:
      return {
        ...state,
        on_territory: [...state.on_territory, action.payload],
      };

    default:
      return state;
  }
};

export default carReducer;
