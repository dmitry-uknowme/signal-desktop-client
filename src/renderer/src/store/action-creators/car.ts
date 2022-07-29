import axios from 'axios'
import React from 'react'
import { CarAction, AllCarsActionTypes, CarsOnTerritoryActionTypes, ICarExited } from '../types/car'
import settings from '../../../../../settings.json'

const API_URL = window.api.getSettings().API_URL

export const fetchAllCars = (page: number, limit: number, filters?: any) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get(
      `${API_URL}/getActs?${page ? `page=${page}` : ''} ${limit ? `&limit=${limit}` : ''}${
        filters ? `&${filters}` : ''
      }`
    )
    dispatch({ type: AllCarsActionTypes.FETCH, payload: data })
  }
}

// export const addCarInAllCars = (payload: ICarExited | any) => {
//   return async (dispatch: React.Dispatch<CarAction>) => {
//     const { data } = await axios.post(
//       'http://localhost:8000/getAllTransportations',
//       payload
//     );
//     dispatch({ type: AllCarsActionTypes.FETCH, payload: data });
//   };
// };

export const fetchCarsOnTerritory = (page: number, limit: number) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get(
      `${API_URL}/getActs?status=STATUS_ON_TERRITORY${page ? `&page=${page}` : ''} ${
        limit ? `&limit=${limit}` : ''
      }`
    )
    dispatch({ type: CarsOnTerritoryActionTypes.FETCH, payload: data })
  }
}

export const addCarOnTerritory = (payload: ICarExited | any, emmitedBySocket: boolean = false) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    if (emmitedBySocket) {
      dispatch({
        type: CarsOnTerritoryActionTypes.ADD_CAR,
        payload
      })
    } else {
      const { data } = await axios.post(`${API_URL}/createEntry`, payload)
      dispatch({
        type: CarsOnTerritoryActionTypes.ADD_CAR,
        payload: data.response
      })
    }
  }
}

export const removeCarFromTerritory = (payload: number, emmitedBySocket: boolean = false) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    dispatch({ type: CarsOnTerritoryActionTypes.REMOVE_CAR, payload })
  }
}
