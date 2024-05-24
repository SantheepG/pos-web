import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { setClicked } from "../../redux/action";
import { mainListItems, secondaryListItems } from "./ListItems";

const defaultTheme = createTheme();

export default function Sidebar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleItemClick = (item) => {
    if (!state[item]) {
      dispatch(setClicked(item, true));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <List component="nav">
        {mainListItems(handleItemClick)}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </ThemeProvider>
  );
}
