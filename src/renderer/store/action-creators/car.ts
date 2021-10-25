/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  CarAction,
  AllCarsActionTypes,
  CarsOnTerritoryActionTypes,
  ICarExited,
  ICarEntered,
} from '../types/car';

export const fetchAllCars = () => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get('http://localhost:8000/all_cars');
    dispatch({ type: AllCarsActionTypes.FETCH, payload: data });
  };
};

export const addCarInAllCars = (payload: ICarExited | any) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.post(
      'http://localhost:8000/all_cars',
      payload
    );
    dispatch({ type: AllCarsActionTypes.FETCH, payload });
  };
};

export const fetchCarsOnTerritory = (payload: ICarEntered | any) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get('http://localhost:8000/cars_on_territory');
    dispatch({ type: CarsOnTerritoryActionTypes.FETCH, payload: data });
  };
};

export const addCarOnTerritory = (payload: ICarExited | any) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.post(
      'http://localhost:8000/all_cars',
      payload
    );
    dispatch({ type: CarsOnTerritoryActionTypes.ADD_CAR, payload: data });
  };
};
