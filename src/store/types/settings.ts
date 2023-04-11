import { ISettings } from "../reducers/settingsReducer";

interface FetchSettingsAction {
  type: SettingsActionTypes.FETCH_SETTINGS;
}

interface SetSettingsAction {
  type: SettingsActionTypes.SET_SETTINGS;
  payload: { data: ISettings };
}

interface ChangeSettingsAction {
  type: SettingsActionTypes.CHANGE_SETTINGS;
  payload: ISettings;
}

export enum SettingsActionTypes {
  FETCH_SETTINGS = "FETCH_SETTINGS",
  SET_SETTINGS = "SET_SETTINGS",
  CHANGE_SETTINGS = "CHANGE_SETTINGS",
}

export type SettingsAction =
  | FetchSettingsAction
  | SetSettingsAction
  | ChangeSettingsAction;
