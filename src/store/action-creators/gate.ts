import axios from 'axios'
import React from 'react'
import {
  GateAction,
  GateActionTypes,
  GatesIds,
  IGateModes,
} from '../types/gate'
import settings from '../../../settings.json'
import store from '../index'

const API_URL = settings.API_URL

export const fetchGateStatus = () => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    const { data } = await axios.get(`${API_URL}/getGateStatus`)
    if (data.status === 'success') {
      dispatch({ type: GateActionTypes.FETCH_GATES, payload: data })
    }
  }
}

export const openGate = (id: GatesIds, emmitedBySocket: boolean = false) => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    if (emmitedBySocket) {
      dispatch({ type: GateActionTypes.OPEN_GATE, payload: id })
    } else {
      dispatch({ type: GateActionTypes.FREEZE_GATE, payload: id })
      axios
        .post(`${API_URL}/unlockedGate`, {
          gate: id,
        })
        .then(response => {
          if (
            response.data.status === 'success' &&
            response.data.allow === true
          ) {
            dispatch({ type: GateActionTypes.OPEN_GATE, payload: id })
          } else {
            dispatch({ type: GateActionTypes.CLOSE_GATE, payload: id })
          }
        })
        .catch(() =>
          dispatch({ type: GateActionTypes.CLOSE_GATE, payload: id })
        )
    }
  }
}

export const closeGate = (id: GatesIds, emmitedBySocket: boolean = false) => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    if (emmitedBySocket) {
      dispatch({
        type: GateActionTypes.CLOSE_GATE,
        payload: id,
      })
    } else {
      dispatch({ type: GateActionTypes.FREEZE_GATE, payload: id })
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
            dispatch({ type: GateActionTypes.OPEN_GATE, payload: id })
          }
        })
        .catch(() => dispatch({ type: GateActionTypes.OPEN_GATE, payload: id }))
    }
  }
}

export const switchGateMode = (mode: IGateModes) => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    const prevMode = store.getState().gate.mode
    dispatch({
      type: GateActionTypes.SWITCH_GATE_MODE,
      payload: IGateModes.MODE_FREEZED,
    })
    axios
      .post(`${API_URL}/switchMode`, { command: mode })
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
            payload: prevMode,
          })
        }
      })
      .catch(() =>
        dispatch({
          type: GateActionTypes.SWITCH_GATE_MODE,
          payload: prevMode,
        })
      )
  }
}
