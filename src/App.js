import React, { useEffect, useState } from "react";
import Dexie from "dexie";
import * as XLSX from "xlsx";
import Login from "./Login/Login";
import Dashboard from "./Main/Dashboard/Dashboard";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const db = new Dexie("SpreadsheetDB");
db.version(1).stores({
  files: "name,data",
});

function App() {
  const [fileExists, setFileExists] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
