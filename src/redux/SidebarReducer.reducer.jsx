// reducer.js
const initialState = {
  dashboardClicked: true,
  inventoryClicked: false,
  itemsClicked: false,
  salesClicked: false,
};

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CLICKED":
      const newFlags = Object.keys(state).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      newFlags[action.payload.item] = action.payload.value;

      return {
        ...newFlags,
      };
    default:
      return state;
  }
};

export default SidebarReducer;
