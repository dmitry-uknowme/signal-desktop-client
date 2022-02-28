/* eslint-disable no-case-declarations */

import {
  AllCarsActionTypes,
  CarAction,
  CarsOnTerritoryActionTypes,
} from '../types/car'

const defaultState = {
  all: { items: [] },
  on_territory: { items: [] },
}

const carReducer = (state = defaultState, action: CarAction) => {
  switch (action.type) {
    case AllCarsActionTypes.FETCH:
      return { ...state, all: action.payload }

    case AllCarsActionTypes.ADD_CAR:
      return {
        ...state,
        all: {
          ...state.all,
          items: [action.payload, ...state.all.items],
        },
      }

    case CarsOnTerritoryActionTypes.FETCH:
      return { ...state, on_territory: action.payload }

    case CarsOnTerritoryActionTypes.ADD_CAR:
      return {
        ...state,
        on_territory: {
          ...state.on_territory,
          items: [action.payload, ...state.on_territory.items],
        },
      }

    case CarsOnTerritoryActionTypes.REMOVE_CAR:
      return {
        ...state,
        on_territory: {
          ...state.on_territory,
          items: [
            ...state.on_territory.items.filter(
              car => car.id !== action.payload
            ),
          ],
        },
        // on_territory: [
        //   ...state.on_territory.filter((car) => car.id !== action.payload),
        // ],
      }

    default:
      return state
  }
}

export default carReducer
