import React, { useState } from "react";
import Dexie from "dexie";
import Login from "./Login/Login";
import Main from "./Main/Main";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const db = new Dexie("SpreadsheetDB");
db.version(1).stores({
  files: "name,data",
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
