import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  category: { _id: "62d82150fa9f3bce7c9a6533", name: "Все" },
  sort: { name: "самые популярные", path: "rating", order: "desc" },
  tableSort: { path: "name", order: "asc" }
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setTableSort(state, action) {
      state.tableSort = action.payload;
    }
  }
});

const { reducer: filterReducer, actions } = filterSlice;
export const { setSearchValue, setCategory, setSort, setTableSort } = actions;

export const getSearchValue = () => (state) => state.filter.searchValue;
export const getCategory = () => (state) => state.filter.category;
export const getSortProperties = () => (state) => state.filter.sort;
export const getTableSortProperties = () => (state) => state.filter.tableSort;

export default filterReducer;
