import api from "../../api";
import { SettingsAction, SettingsActionTypes } from "../types/settings";

export const fetchSettings = () => {
  return async (dispatch: React.Dispatch<SettingsAction>) => {
    const data = await api.tauri.getSettings();
    console.log("ddd", data);
    dispatch({ type: SettingsActionTypes.SET_SETTINGS, payload: data });
  };
};
