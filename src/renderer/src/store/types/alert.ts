export enum AlertActionTypes {
  ADD_ALERT = 'ADD_ALERT'
}

interface AddAlertAction {
  type: AlertActionTypes.ADD_ALERT
  payload: { title: string; type: 'SUCCESS' | 'WARNING' | 'ERROR' }
}

export type AlertAction = AddAlertAction
