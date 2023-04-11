import api from "../../api";
import { ISettings } from "../reducers/settingsReducer";
import { SettingsAction, SettingsActionTypes } from "../types/settings";

export const fetchSettings = (reloadCache: boolean = false) => {
  return async (dispatch: React.Dispatch<SettingsAction>) => {
    const data = await api.tauri.getSettings(reloadCache);
    const fixtureData = {
      API_URL: "http://127.0.0.1:581/v1",
      aWEBSOCKET_URL: "ws://127.0.0.1:8877/connection/websocket",
      aAPI_URL: "http://62.109.23.190:44/v1",
      WEBSOCKET_URL: "ws://192.168.31.244:8877/connection/websocket",
      POLYGON_NAME: 'ООО "Спецэкотранс"',
      POLYGON_ID:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      CAMERA_STREAMS: [
        {
          label: "Камера въезд",
          id: "CAMERA_ENTER",
          url: "rtsp://admin:123456@46.23.191.93:556/profile1",
        },
        {
          label: "Камера выезд",
          id: "CAMERA_EXIT",
          url: "rtsp://admin:123456@46.23.191.93:556/profile1",
        },
      ],
    };
    // dispatch({ type: SettingsActionTypes.SET_SETTINGS, payload: fixtureData });
    dispatch({ type: SettingsActionTypes.SET_SETTINGS, payload: data });
  };
};

export const changeSettings = (payload: ISettings) => {
  return async (dispatch: React.Dispatch<SettingsAction>) => {
    const data = await api.tauri.changeSettings(payload);
    console.log("changgg", data);
    dispatch({
      type: SettingsActionTypes.SET_SETTINGS,
      payload: JSON.parse(payload),
    });
  };
};
