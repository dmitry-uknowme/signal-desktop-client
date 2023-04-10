import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SettingsContextProvider from "./context/settings/SettingsContextProvider";
import store from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./styles/rsuite.global.css";
import "./styles/bootstrap.global.css";
import "./styles/App.global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  </Provider>
);
