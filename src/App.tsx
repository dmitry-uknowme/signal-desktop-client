import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DasboardPage from "./pages/Dashboard";
import StatsPage from "./pages/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<DasboardPage />} />
        <Route index path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
