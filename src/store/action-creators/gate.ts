import axios from 'axios'
import React from 'react'
import {
  GateAction,
  GateActionTypes,
  GatesIds,
  IGateModes,
} from '../types/gate'

const API_URL = 'http://127.0.0.1:81/v1'

export const fetchGateStatus = () => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    const { data } = await axios.get(`${API_URL}/getGateStatus`)
    if (data.status === 'success') {
      dispatch({ type: GateActionTypes.FETCH_GATES, payload: data })
    }
  }
}

export const openGate = (id: GatesIds) => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    const { data } = await axios.post(`${API_URL}/unlockedGate`, {
      gate: id,
    })
    if (data.status === 'success' && data.allow === true) {
      dispatch({ type: GateActionTypes.OPEN_GATE, payload: id })
    }
  }
}

export const closeGate = (id: GatesIds) => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    axios
      .post(`${API_URL}/lockedGate`, {
        gate: id,
      })
      .then(response => {
        const data = response.data
        if (data.status === 'success' && data.allow === true) {
          dispatch({
            type: GateActionTypes.CLOSE_GATE,
            payload: id,
          })
        } else {
          dispatch({
            type: GateActionTypes.CLOSE_GATE,
            payload: {
              error: true,
              message: `Ошибка при открытии шлагбаума для ${
                id === GatesIds.INPUT ? 'въезда' : 'выезда'
              }`,
            },
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GateActionTypes.CLOSE_GATE,
          payload: {
            error: true,
            message: `Ошибка при открытии шлагбаума для ${
              id === GatesIds.INPUT ? 'въезда' : 'выезда'
            }`,
          },
        })
      })
    // if (data.status === 'success' && data.allow === true) {
    //   dispatch({ type: GateActionTypes.CLOSE_GATE, payload: id })
    // }
  }
}
// export const closeGate = (id: GatesIds) => {
//   return async (dispatch: React.Dispatch<GateAction>) => {
//     const { data } = await axios.post(`http://62.109.23.190:44/v1/lockedGate`, {
//       gate: id,
//     })
//     if (data.status === 'success' && data.allow === true) {
//       dispatch({ type: GateActionTypes.CLOSE_GATE, payload: id })
//     }
//   }
// }

export const switchGateMode = (mode: IGateModes) => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    axios
      .post(`${API_URL}/switchMode  `, { command: mode })
      .then(response => {
        const data = response.data
        if (data.status === 'success') {
          dispatch({
            type: GateActionTypes.SWITCH_GATE_MODE,
            payload: data.mode,
          })
        } else {
          dispatch({
            type: GateActionTypes.SWITCH_GATE_MODE,
            payload: {
              error: true,
              message: 'Ошибка при смене режима управления',
            },
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GateActionTypes.SWITCH_GATE_MODE,
          payload: {
            error: true,
            message: 'Ошибка при смене режима управления',
          },
        })
      })
  }
}
