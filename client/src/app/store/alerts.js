import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemAlert: {}
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setItemAlert(state, action) {
      state.itemAlert = action.payload;
    }
  }
});

const { reducer: alertsReducer, actions } = alertsSlice;
export const { setItemAlert } = actions;

export const getItemAlert = () => (state) => state.alerts.itemAlert;

export default alertsReducer;
