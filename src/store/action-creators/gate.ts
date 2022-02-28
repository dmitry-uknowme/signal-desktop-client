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
import { ipcRenderer } from 'electron'

const API_URL = settings.API_URL

export const fetchGateStatus = () => {
  return async (dispatch: React.Dispatch<GateAction>) => {
    axios
      .get(`${API_URL}/getGateStatus`)
      .then(response => {
        const data = response.data
        if (data.status === 'success') {
          dispatch({ type: GateActionTypes.FETCH_GATES, payload: data })
          ipcRenderer.send('write-log', {
            level: 'info',
            scope: 'actions:gate',
            text: `Successfully got gate status ${JSON.stringify(
              response.data
            )}`,
          })
        }
      })
      .catch(err =>
        ipcRenderer.send('write-log', {
          title: err.response.data.title,
          level: 'error',
          scope: 'actions:gate',
          text:
            err.response.data.detail ||
            `Error occured while getting gate status ${JSON.stringify(err)}`,
        })
      )
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
            ipcRenderer.send('write-log', {
              level: 'info',
              scope: 'actions:gate',
              text: `Successfully opened gate`,
              payload: JSON.stringify({ id }),
            })
          } else {
            dispatch({ type: GateActionTypes.CLOSE_GATE, payload: id })
          }
        })
        .catch(err => {
          dispatch({ type: GateActionTypes.CLOSE_GATE, payload: id })
          ipcRenderer.send('write-log', {
            title: err.response.data.title,
            level: 'error',
            scope: 'actions:gate',
            text:
              err.response.data.detail ||
              `Error occured while openning gate ${JSON.stringify(err)}`,
            payload: JSON.stringify({ id }),
          })
        })
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
            ipcRenderer.send('write-log', {
              level: 'info',
              scope: 'actions:gate',
              text: `Successfully closing gate`,
              payload: JSON.stringify({ id }),
            })
          } else {
            dispatch({ type: GateActionTypes.OPEN_GATE, payload: id })
          }
        })
        .catch(err => {
          dispatch({ type: GateActionTypes.OPEN_GATE, payload: id })
          ipcRenderer.send('write-log', {
            title: err.response.data.title,
            level: 'error',
            scope: 'actions:gate',
            text:
              err.response.data.detail ||
              `Error occured while closing gate ${JSON.stringify(err)}`,
            payload: JSON.stringify({ id }),
          })
        })
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
          ipcRenderer.send('write-log', {
            level: 'info',
            scope: 'actions:gate',
            text: `Successfully switching gate mode`,
            payload: JSON.stringify({ mode }),
          })
        } else {
          dispatch({
            type: GateActionTypes.SWITCH_GATE_MODE,
            payload: prevMode,
          })
          ipcRenderer.send('write-log', {
            title: data.title,
            level: 'error',
            scope: 'actions:gate',
            text:
              data.detail ||
              `Error occured while switching gate mode ${JSON.stringify(data)}`,
            payload: JSON.stringify({ mode }),
          })
        }
      })
      .catch(err => {
        dispatch({
          type: GateActionTypes.SWITCH_GATE_MODE,
          payload: prevMode,
        })
        ipcRenderer.send('write-log', {
          title: err.response.data.title,
          level: 'error',
          scope: 'actions:gate',
          text:
            err.response.data.detail ||
            `Error occured while switching gate mode ${JSON.stringify(err)}`,
          payload: JSON.stringify({ mode }),
        })
      })
      .finally(async () => {
        axios
          .get(`${API_URL}/getGateStatus`)
          .then(response => {
            const data = response.data
            if (data.status === 'success') {
              dispatch({
                type: GateActionTypes.FETCH_GATES,
                payload: {
                  inputGateStatus: data.inputGateStatus,
                  outputGateStatus: data.outputGateStatus,
                },
              })
              ipcRenderer.send('write-log', {
                level: 'info',
                scope: 'actions:gate',
                text: `Successfully got gate status ${JSON.stringify(
                  response.data
                )}`,
              })
            }
          })
          .catch(err =>
            ipcRenderer.send('write-log', {
              title: err.response.data.title,
              level: 'error',
              scope: 'actions:gate',
              text:
                err.response.data.detail ||
                `Error occured while getting gate status ${JSON.stringify(
                  err
                )}`,
            })
          )
      })
  }
}
