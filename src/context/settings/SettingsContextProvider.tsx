import { useLayoutEffect, useState } from "react";
import SettingsContext, { ISettings } from "./SettingsContext";
import { invoke } from "@tauri-apps/api/tauri";
import api from "../../api";
import useActions from "../../hooks/useActions";

const SettingsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<ISettings>();
  const { fetchSettings } = useActions();

  // const initSettings = () => {
  //   api.tauri.getSettings();
  // };
  useLayoutEffect(() => {
    fetchSettings();
  }, []);

  return (
    //@ts-expect-error
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
