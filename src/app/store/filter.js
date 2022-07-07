import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "0",
  sort: { name: "самые популярные", path: "rating", order: "desc" }
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    }
  }
});

const { reducer: filterReducer, actions } = filterSlice;
export const { setCategory, setSort } = actions;

export const getSortProperties = () => (state) => state.filter.sort;
export const getCategory = () => (state) => state.filter.category;

export default filterReducer;
