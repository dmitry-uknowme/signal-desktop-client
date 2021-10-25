/* eslint-disable import/prefer-default-export */

export interface ICarEntered {
  id: number;
  number_plate: string;
  weight_brutto: string;
  transporter_company: string;
  cargo_category: string;
  cargo_type: string;
  date_of_enter: string;
}

export interface ICarExited extends ICarEntered {
  weight_netto: string;
  result_weight: string;
  date_of_exit: string;
  status: string;
}

export enum AllCarsActionTypes {
  FETCH = 'FETCH_ALL_CARS',
  ADD_CAR = 'ADD_CAR_IN_ALL_CARS',
}

export enum CarsOnTerritoryActionTypes {
  FETCH = 'FETCH_CARS_ON_TERRITORY',
  ADD_CAR = 'ADD_CAR_ON_TERRITORY',
}

interface FetchAllCarsAction {
  type: AllCarsActionTypes.FETCH;
  payload: ICarExited[];
}

interface AddCarInAllCarsAction {
  type: AllCarsActionTypes.ADD_CAR;
  payload: ICarExited;
}

interface FetchCarsOnTerritoryAction {
  type: CarsOnTerritoryActionTypes.FETCH;
  payload: ICarEntered[];
}

interface AddCarOnTerritoryAction {
  type: CarsOnTerritoryActionTypes.ADD_CAR;
  payload: ICarEntered;
}

export type CarAction =
  | FetchAllCarsAction
  | AddCarInAllCarsAction
  | FetchCarsOnTerritoryAction
  | AddCarOnTerritoryAction;
