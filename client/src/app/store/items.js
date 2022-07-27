import { createAction, createSlice } from "@reduxjs/toolkit";

import itemService from "../services/item.service";

import { setItemAlert } from "./alerts";

const initialState = {
  entities: null,
  isLoading: true,
  error: null
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsRequested: (state) => {
      state.isLoading = true;
    },
    itemsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    itemsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    itemCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    itemUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((i) => i._id === action.payload._id)
      ] = action.payload;
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i._id !== action.payload);
    }
  }
});

const { reducer: itemsReducer, actions } = itemsSlice;
const {
  itemsRequested,
  itemsReceived,
  itemsRequestFailed,
  itemCreated,
  itemUpdated,
  itemRemoved
} = actions;

const itemCreateRequested = createAction("items/itemCreateRequested");
const itemCreateFailed = createAction("items/itemCreateFailed");
const itemUpdateRequested = createAction("items/itemUpdateRequested");
const itemUpdateFailed = createAction("items/itemUpdateFailed");
const itemRemoveRequested = createAction("items/itemRemoveRequested");
const itemRemoveFailed = createAction("items/itemRemoveFailed");

export function createItem(payload) {
  return async (dispatch) => {
    dispatch(itemCreateRequested());
    try {
      const { content } = await itemService.create(payload);
      dispatch(itemCreated(content));
      dispatch(
        setItemAlert({ content: "Новый товар добавлен", color: "success" })
      );
    } catch (error) {
      dispatch(itemCreateFailed(error.message));
    }
  };
}

export function updateItem(payload) {
  return async (dispatch) => {
    dispatch(itemUpdateRequested());
    try {
      const { content } = await itemService.update(payload);
      dispatch(itemUpdated(content));
      dispatch(setItemAlert({ content: "Товар изменен", color: "warning" }));
    } catch (error) {
      dispatch(itemUpdateFailed(error.message));
    }
  };
}

export function removeItem(itemId) {
  return async (dispatch) => {
    dispatch(itemRemoveRequested());
    try {
      const { content } = await itemService.remove(itemId);
      if (!content) {
        dispatch(itemRemoved(itemId));
        dispatch(setItemAlert({ content: "Товар удален", color: "danger" }));
      }
    } catch (error) {
      dispatch(itemRemoveFailed(error.message));
    }
  };
}

export function loadItemsList() {
  return async (dispatch) => {
    dispatch(itemsRequested());
    try {
      const { content } = await itemService.get();
      dispatch(itemsReceived(content));
    } catch (error) {
      dispatch(itemsRequestFailed(error.message));
    }
  };
}

export function getItemsLoadingStatus() {
  return (state) => state.items.isLoading;
}

export function getItemById(itemId) {
  return (state) =>
    state.items.entities && state.items.entities.find((i) => i._id === itemId);
}

export function getItems() {
  return (state) => state.items.entities;
}

export default itemsReducer;
