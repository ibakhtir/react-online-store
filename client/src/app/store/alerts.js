import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: {}
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
    }
  }
});

const { reducer: alertsReducer, actions } = alertsSlice;
export const { setAlert } = actions;

export const getAlert = () => (state) => state.alerts.alert;

export default alertsReducer;
