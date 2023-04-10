import { SettingsAction, SettingsActionTypes } from "../types/settings";

export interface ISettings {
  API_URL: string;
  WEBSOCKET_URL: string;
  POLYGON_NAME: string;
  POLYGON_ID: string;
  CAMERA_STREAMS: {
    label: string;
    id: string;
    url: string;
  }[];
}

const defaultState: ISettings = {} as ISettings;

const settingsReducer = (state = defaultState, action: SettingsAction) => {
  switch (action.type) {
    case SettingsActionTypes.SET_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
