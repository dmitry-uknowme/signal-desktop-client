import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DasboardPage from "./pages/Dashboard";
import StatsPage from "./pages/Stats";
import { useEffect, useLayoutEffect, useState } from "react";
import useActions from "./hooks/useActions";
import { useSelector } from "react-redux";
import { Loader, Placeholder } from "rsuite";
import SettingsPage from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<DasboardPage />} />
        <Route index path="/stats" element={<StatsPage />} />
        <Route index path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
