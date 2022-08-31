/* eslint-disable no-case-declarations */
import { toast } from 'react-toastify'
import { AlertAction } from '../types/alert'

const ADD_ALERT = 'ADD_ALERT'

const defaultState = []

const alertReducer = (state = defaultState, action: AlertAction) => {
  switch (action.type) {
    case ADD_ALERT:
      const title = action.payload.title
      const type = action.payload.type
      switch (type) {
        case 'SUCCESS':
          return toast.success(title)
        case 'WARNING':
          return toast.warning(title)
        case 'ERROR':
          return toast.error(title)
        default:
          return toast.success(title)
      }

    default:
      return state
  }
}

export default alertReducer
