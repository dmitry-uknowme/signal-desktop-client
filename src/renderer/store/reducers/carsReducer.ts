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
      console.log('all', action.payload);
      return { ...state, all: action.payload };

    case CarsOnTerritoryActionTypes.FETCH:
      return { ...state, on_territory: action.payload };

    // case ADD_CAR_IN_ALL_CARS:
    //   return {
    //     ...state,
    //     all_cars: [...state.all_cars, action.payload],
    //   };

    // case ADD_CAR_ON_TERRITORY:
    //   return {
    //     ...state,
    //     cars_on_territory: [...state.cars_on_territory, action.payload],
    //   };

    default:
      return state;
  }
};

export default carReducer;
