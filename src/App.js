import React, { useEffect, useState } from "react";
import { AppProvider } from "./AppContext";
import "./App.css";
import Login from "./components/Login/Login";
import Main from "./components/Main";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const imgFormats = ["jpg", "jpeg", "png", "bmp", "wbmp"];

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
