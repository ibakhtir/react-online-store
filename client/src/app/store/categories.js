import { createSlice } from "@reduxjs/toolkit";

import categoryService from "../services/category.service";

const initialState = {
  entities: null,
  isLoading: true,
  error: null
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = false;
    },
    categoriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoriesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
  actions;

export function loadCategoriesList() {
  return async (dispatch) => {
    dispatch(categoriesRequested());
    try {
      const { content } = await categoryService.get();
      dispatch(categoriesReceived(content));
    } catch (error) {
      dispatch(categoriesRequestFailed(error.message));
    }
  };
}

export function getCategories() {
  return (state) => state.categories.entities;
}

export function getCategoriesById(categoriesIds) {
  return (state) => {
    const categoriesArr = [];
    if (state.categories.entities) {
      categoriesIds.forEach((categoryId) => {
        state.categories.entities.forEach((category) => {
          if (category._id === categoryId) {
            categoriesArr.push(category);
          }
        });
      });
    }
    return categoriesArr;
  };
}

export default categoriesReducer;
