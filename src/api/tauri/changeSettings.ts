import { invoke } from "@tauri-apps/api/tauri";
import { ISettings } from "../../store/reducers/settingsReducer";

const changeSettings = async (payload: ISettings) => {
  await invoke("change_settings", { payload });
};
export default changeSettings;
