import axios from "axios";
import React from "react";
import {
  GateAction,
  GateActionTypes,
  GatesIds,
  GatesVectors,
  IGateModes,
} from "../types/gate";
import store from "../index";
import { addAlert } from "./alert";
import { AlertActionTypes } from "../types/alert";
import { toast } from "react-toastify";
import api from "../../api";

export const fetchGateStatus = () => {
  const API_URL = api.tauri.getSettings().API_URL;
  return async (dispatch: React.Dispatch<GateAction>) => {
    const { data } = await axios.get(`${API_URL}/getGateStatus`);
    if (data.status === "success") {
      dispatch({ type: GateActionTypes.FETCH_GATES, payload: data });
    }
  };
};

export const openGate = (
  id: GatesIds,
  vector: GatesVectors,
  emmitedBySocket: boolean = false
) => {
  const API_URL = api.tauri.getSettings().API_URL;
  return async (dispatch: React.Dispatch<GateAction>) => {
    if (emmitedBySocket) {
      dispatch({ type: GateActionTypes.OPEN_GATE, payload: { id, vector } });
    } else {
      let errorText = "";
      dispatch({ type: GateActionTypes.FREEZE_GATE, payload: id });
      toast.promise(
        new Promise((resolve, reject) => {
          axios
            .post(`${API_URL}/unlockedGate`, {
              gate: id,
              vector,
            })
            .then((response) => {
              if (
                response.data.status === "success" &&
                response.data.allow === true
              ) {
                dispatch({
                  type: GateActionTypes.OPEN_GATE,
                  payload: { id, vector },
                });
                setTimeout(() => {
                  dispatch({
                    type: GateActionTypes.CLOSE_GATE,
                    payload: { id },
                  });
                  resolve(null);
                }, 500);
              }
            })
            .catch((error) => {
              errorText = error.message;
              setTimeout(() => {
                reject(error.message);
              }, 1500);
            });
        }),

        {
          pending: "Отправлен запрос на открытие шлагбаума",
          success: "Шлагбаум успешно открылся",
          error: `Ошибка при открытии шлагбаума.\n ${errorText}`,
        }
      );
    }
  };
};

export const closeGate = (
  id: GatesIds,
  vector: GatesVectors,
  emmitedBySocket: boolean = false
) => {
  const API_URL = api.tauri.getSettings().API_URL;
  return async (dispatch: React.Dispatch<GateAction>) => {
    if (emmitedBySocket) {
      // dispatch({
      //   type: GateActionTypes.CLOSE_GATE,
      //   payload: id,
      // })
    } else {
      dispatch({
        type: GateActionTypes.CLOSE_GATE,
        payload: { id, vector },
      });
    }
  };
};

export const switchGateMode = (mode: IGateModes) => {
  const API_URL = api.tauri.getSettings().API_URL;
  return async (dispatch: React.Dispatch<GateAction>) => {
    const prevMode = store.getState().gate.mode;
    dispatch({
      type: GateActionTypes.SWITCH_GATE_MODE,
      payload: IGateModes.MODE_FREEZED,
    });
    axios
      .post(`${API_URL}/switchMode  `, { command: mode })
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          dispatch({
            type: GateActionTypes.SWITCH_GATE_MODE,
            payload: data.mode,
          });
        } else {
          dispatch({
            type: GateActionTypes.SWITCH_GATE_MODE,
            payload: prevMode,
          });
        }
      })
      .catch(() =>
        dispatch({
          type: GateActionTypes.SWITCH_GATE_MODE,
          payload: prevMode,
        })
      );
  };
};
