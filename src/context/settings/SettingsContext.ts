import React from "react";

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

export interface ISettingsContext {
  settings?: ISettings;
  setSettings?: React.Dispatch<React.SetStateAction<ISettings>>;
}

const SettingsContext = React.createContext({} as ISettingsContext);

export default SettingsContext;
