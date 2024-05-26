import React from "react";
import Sidebar from "./Navigation/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Navigation/Navbar";
import { useSelector } from "react-redux";
import Sales from "./Sales/Sales";
import Items from "./Items/Items";
import Inventory from "./Inventory/Inventory";
const Main = () => {
  const state = useSelector((state) => state);

  let componentToRender;

  if (state.dashboardClicked) {
    componentToRender = <Dashboard />;
  } else if (state.salesClicked) {
    componentToRender = <Sales />;
  } else if (state.itemsClicked) {
    componentToRender = <Items />;
  } else if (state.inventoryClicked) {
    componentToRender = <Inventory />;
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
