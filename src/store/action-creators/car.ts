import axios from 'axios'
import React from 'react'
import {
  CarAction,
  AllCarsActionTypes,
  CarsOnTerritoryActionTypes,
  ICarExited,
} from '../types/car'
import settings from '../../../settings.json'
import { ipcRenderer } from 'electron'
import store from '../index'

const API_URL = settings.API_URL

export const fetchAllCars = (page: number, limit: number, filters?: any) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    axios
      .get(
        `${API_URL}/getActs?${page ? `page=${page}` : ''} ${
          limit ? `&limit=${limit}` : ''
        }${filters ? `&${filters}` : ''}`
      )
      .then(response => {
        if (response.data.status === 'success') {
          dispatch({ type: AllCarsActionTypes.FETCH, payload: response.data })
          ipcRenderer.send('write-log', {
            level: 'info',
            scope: 'actions:truck',
            text: `Successfully got all trucks ${JSON.stringify(
              response.data
            )}`,
          })
        } else {
          ipcRenderer.send('write-log', {
            level: 'error',
            scope: 'actions:truck',
            text: `Error occured while getting all trucks: response status is not success ${JSON.stringify(
              response.data
            )}`,
          })
        }
      })
      .catch(err =>
        ipcRenderer.send('write-log', {
          level: 'error',
          scope: 'actions:truck',
          text: `Error occured while getting all trucks ${JSON.stringify(err)}`,
        })
      )
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
    axios
      .get(
        `${API_URL}/getActs?status=STATUS_ON_TERRITORY${
          page ? `&page=${page}` : ''
        } ${limit ? `&limit=${limit}` : ''}`
      )
      .then(response => {
        if (response.data.status === 'success') {
          dispatch({
            type: CarsOnTerritoryActionTypes.FETCH,
            payload: response.data,
          })
          ipcRenderer.send('write-log', {
            level: 'info',
            scope: 'actions:truck',
            text: `Successfully got trucks on territory ${JSON.stringify(
              response.data
            )}`,
          })
        } else {
          ipcRenderer.send('write-log', {
            level: 'error',
            scope: 'actions:truck',
            text: `Error occured while getting trucks on territory: response status is not success ${JSON.stringify(
              response.data
            )}`,
          })
        }
      })
      .catch(err => {
        ipcRenderer.send('write-log', {
          level: 'error',
          scope: 'actions:truck',
          text: `Error occured while getting trucks on territory ${JSON.stringify(
            err
          )}`,
        })
      })
  }
}

export const addCarOnTerritory = (
  payload: ICarExited | any,
  emmitedBySocket: boolean = false
) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    if (emmitedBySocket) {
      dispatch({
        type: CarsOnTerritoryActionTypes.ADD_CAR,
        payload,
      })
    } else {
      axios
        .post(`${API_URL}/createEntry`, payload)
        .then(response => {
          console.log('entry', response.data)
          if (response.data.status === 'success') {
            dispatch({
              type: CarsOnTerritoryActionTypes.ADD_CAR,
              payload: response.data.response,
            })
            ipcRenderer.send('write-log', {
              level: 'info',
              scope: 'actions:truck',
              text: `Successfully added truck on territory ${JSON.stringify({
                payload,
                response,
              })}`,
            })
          } else {
            ipcRenderer.send('write-log', {
              level: 'error',
              scope: 'actions:truck',
              text: `Error occured while adding truck on territory: response status is not success ${JSON.stringify(
                response.data
              )}`,
            })
          }
        })
        .catch(err =>
          ipcRenderer.send('write-log', {
            title: err.response.data.title,
            level: 'error',
            scope: 'actions:truck',
            text:
              err.response.data.detail ||
              `Error occured while adding truck on territory ${JSON.stringify(
                err
              )}`,
            payload: JSON.stringify(payload),
          })
        )
    }
  }
}

export const removeCarFromTerritory = (
  payload: any,
  emmitedBySocket: boolean = false
) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    if (emmitedBySocket) {
      const foundCar = store
        .getState()
        .cars.on_territory.items.find(car => car.id === payload.id)
      console.log('found', foundCar)
      dispatch({
        type: CarsOnTerritoryActionTypes.REMOVE_CAR,
        payload: payload.actId,
      })
      dispatch({
        type: AllCarsActionTypes.ADD_CAR,
        payload: {
          ...foundCar,
          status: 'STATUS_COMPLETED',
          weight_net: payload.weight_net,
          weight_container: payload.weight_container,
          check_out_date_time: payload.check_out_date_time,
        },
      })
    } else {
      const foundCar = store
        .getState()
        .cars.on_territory.items.find(car => car.id === payload.actId)
      axios
        .post(`${API_URL}/createCheckOut`, {
          actId: payload.actId,
          weight: payload.weight,
          commentCheckOut: payload.commentCheckOut,
        })
        .then(response => {
          const data = response.data
          if (data.status === 'success') {
            dispatch({
              type: CarsOnTerritoryActionTypes.REMOVE_CAR,
              payload: payload.actId,
            })
            dispatch({
              type: AllCarsActionTypes.ADD_CAR,
              payload: { ...foundCar },
            })
            ipcRenderer.send('write-log', {
              level: 'info',
              scope: 'actions:truck',
              text: `Successfully remove truck from territory ${JSON.stringify(
                response.data
              )}`,
            })
          }
        })
        .catch(err =>
          ipcRenderer.send('write-log', {
            title: err.response.data.title,
            level: 'error',
            scope: 'actions:truck',
            text:
              err.response.data.detail ||
              `Error occured while removing truck from territory ${JSON.stringify(
                err
              )}`,
            payload: JSON.stringify(payload),
          })
        )
    }
  }
}
