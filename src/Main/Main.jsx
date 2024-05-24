import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard/Dashboard";
import Items from "./Items/Items";
import Sales from "./Sales/Sales";

export default function Main() {
  const state = useSelector((state) => state);

  let componentToRender;

  if (state.dashboardClicked) {
    componentToRender = <Dashboard />;
  } else if (state.salesClicked) {
    componentToRender = <Sales />;
  } else if (state.itemsClicked) {
    componentToRender = <Items />;
  }

  return <React.Fragment>{componentToRender}</React.Fragment>;
}
