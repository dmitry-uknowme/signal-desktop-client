/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CarAction,
  AllCarsActionTypes,
  CarsOnTerritoryActionTypes,
} from '../types/car';

export const fetchAllCars = () => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get('http://localhost:8000/all_cars');
    dispatch({ type: AllCarsActionTypes.FETCH, payload: data });
  };
};

export const fetchCarsOnTerritory = () => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get('http://localhost:8000/cars_on_territory');
    dispatch({ type: CarsOnTerritoryActionTypes.FETCH, payload: data });
  };
};
