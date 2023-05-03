import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import "./styles/rsuite.global.css";
import "rsuite/dist/rsuite.min.css";
import "./styles/bootstrap.global.css";
import "./styles/App.global.css";
import CentrifugeProvider from "./context/centrifuge/ContextProvider";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 15000 } },
  // defaultOptions: { queries: { staleTime: 30000 } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {/* <SettingsContextProvider> */}
      <CentrifugeProvider>
        <App />
      </CentrifugeProvider>
      {/* </SettingsContextProvider> */}
    </Provider>
  </QueryClientProvider>
);
