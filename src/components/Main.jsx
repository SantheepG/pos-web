import React from "react";
import Sidebar from "./Navigation/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navigation/Navbar";
const Main = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Dashboard />
    </>
  );
};
export default Main;
