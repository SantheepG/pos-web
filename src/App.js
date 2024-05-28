import { AppProvider } from "./AppContext";
import "./App.css";
import Login from "./components/Login/Login";
import Main from "./components/Main";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const imgFormats = ["jpg", "jpeg", "png", "bmp", "wbmp"];

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
