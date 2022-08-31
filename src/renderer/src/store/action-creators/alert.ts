import { AlertActionTypes } from '../types/alert'

export const addAlert = (payload: { title: string; type: 'SUCCESS' | 'WARNING' | 'ERROR' }) => ({
  type: AlertActionTypes.ADD_ALERT,
  payload
})
