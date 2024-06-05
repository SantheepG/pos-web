import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("tkn");
    if (storedToken) {
      setToken(true);
    } else {
      setToken(false);
    }
    setChecked(true);
  }, []);

  return checked && (token ? <Outlet /> : <Navigate to="/login" />);
};

export default ProtectedRoute;
