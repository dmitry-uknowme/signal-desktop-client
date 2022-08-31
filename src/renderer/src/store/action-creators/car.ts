import axios from 'axios'
import React from 'react'
import { CarAction, AllCarsActionTypes, CarsOnTerritoryActionTypes, ICarExited } from '../types/car'
import settings from '../../../../../settings.json'
import { toast } from 'react-toastify'

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
      let errorText = ''
      toast.promise(
        new Promise((resolve, reject) => {
          axios
            .post(`${API_URL}/createEntry`, payload)
            .then((response) => {
              const data = response.data.response
              dispatch({
                type: CarsOnTerritoryActionTypes.ADD_CAR,
                payload: data
              })
              setTimeout(() => {
                resolve(null)
              }, 500)
            })
            .catch((error) => {
              errorText = error.message
              setTimeout(() => {
                reject(error.message)
              }, 1500)
            })
        }),
        {
          pending: 'Идет отправка акта на сервер',
          success: 'Отправка акта на сервер успешна завершена',
          error: `Ошибка при отправке акта на сервер.\n ${errorText}`
        }
      )
    }
  }
}

export const removeCarFromTerritory = (payload: any, emmitedBySocket: boolean = false) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    let errorText = ''
    toast.promise(
      new Promise((resolve, reject) => {
        axios
          .post(`${API_URL}/createCheckOut`, {
            actId: payload.actId,
            weight: payload.weight,
            commentCheckOut: payload.commentCheckOut
          })
          .then(() => {
            dispatch({ type: CarsOnTerritoryActionTypes.REMOVE_CAR, payload })
            setTimeout(() => {
              resolve(null)
            }, 500)
          })
          .catch((error) => {
            errorText = error.message
            setTimeout(() => {
              reject(error.message)
            }, 1500)
          })
      }),
      {
        pending: 'Идет отправка акта на сервер',
        success: 'Отправка акта на сервер успешна завершена',
        error: `Ошибка при отправке акта на сервер.\n ${errorText}`
      }
    )
  }
}
