import React from "react";
import Sidebar from "./Navigation/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navigation/Navbar";
import { useSelector } from "react-redux";
import Sales from "./Sales/Sales";
import Items from "./Items/Items";

const Main = () => {
  const state = useSelector((state) => state);

  let componentToRender;

  if (state.dashboardClicked) {
    componentToRender = <Dashboard />;
  } else if (state.salesClicked) {
    componentToRender = <Sales />;
  } else if (state.itemsClicked) {
    componentToRender = <Items />;
  }

  return (
    <>
      <Sidebar />
      <Navbar />
      {componentToRender}
    </>
  );
};
export default Main;
