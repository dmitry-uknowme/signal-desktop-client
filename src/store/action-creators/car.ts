import axios from 'axios'
import {
  CarAction,
  AllCarsActionTypes,
  CarsOnTerritoryActionTypes,
  ICarExited,
  ICarEntered,
} from '../types/car'

export const fetchAllCars = (page: number, limit: number) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.get(
      `http://62.109.23.190:44/v1/getActs?status=STATUS_COMPLETED${
        page ? `&page=${page}` : ''
      } ${limit ? `&limit=${limit}` : ''}`
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
      `http://62.109.23.190:44/v1/getActs?status=STATUS_ON_TERRITORY${
        page ? `&page=${page}` : ''
      } ${limit ? `&limit=${limit}` : ''}`
    )
    dispatch({ type: CarsOnTerritoryActionTypes.FETCH, payload: data })
  }
}
// export const fetchCarsOnTerritory = (payload: ICarEntered | any) => {
//   return async (dispatch: React.Dispatch<CarAction>) => {
//     const { data } = await axios.get('http://localhost:8000/cars_on_territory');
//     dispatch({ type: CarsOnTerritoryActionTypes.FETCH, payload: data });
//   };
// };

export const addCarOnTerritory = (payload: ICarExited | any) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    const { data } = await axios.post(
      `http://62.109.23.190:44/v1/createEntry`,
      payload
    )
    // console.log('resssss', data);
    // await axios.post(`${process.env.API_URL}/getTransportationsOnTerritory`, {
    //   ...payload,
    //   organizationShortName: null,
    //   cargoTypeTitle: null,
    //   cargoCategoryTitle: null,
    // });
    dispatch({
      type: CarsOnTerritoryActionTypes.ADD_CAR,
      payload: data.response,
    })
  }
}
// export const addCarOnTerritory = (payload: ICarExited | any) => {
//   return async (dispatch: React.Dispatch<CarAction>) => {
//     const { data } = await axios.post(
//       'http://localhost:8000/cars_on_territory',
//       payload
//     );
//     dispatch({ type: CarsOnTerritoryActionTypes.ADD_CAR, payload: data });
//   };
// };

export const removeCarFromTerritory = (payload: number) => {
  return async (dispatch: React.Dispatch<CarAction>) => {
    // await axios.delete(`${process.env.API_URL}/createEntry/${payload}`);
    // await axios.delete(
    //   `${process.env.API_URL}/getTransportationsOnTerritory/${payload}`
    // );
    dispatch({ type: CarsOnTerritoryActionTypes.REMOVE_CAR, payload })
  }
}
