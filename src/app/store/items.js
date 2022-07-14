import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import itemService from "../services/item.service";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
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
        state.entities.findIndex((i) => i.id === action.payload.id)
      ] = action.payload;
    },
    itemRemoved: (state, action) => {
      state.entities = state.entities.filter((i) => i.id !== action.payload);
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
    dispatch(itemCreateRequested(payload));
    try {
      const item = {
        ...payload,
        id: nanoid()
      };
      const { content } = await itemService.create(item);
      dispatch(itemCreated(content));
    } catch (error) {
      dispatch(itemCreateFailed(error.message));
    }
  };
}

export function updateItem(payload) {
  return async (dispatch) => {
    dispatch(itemUpdateRequested(payload));
    try {
      const { content } = await itemService.update(payload);
      dispatch(itemUpdated(content));
    } catch (error) {
      dispatch(itemUpdateFailed(error.message));
    }
  };
}

export function removeItem(itemId) {
  return async (dispatch) => {
    dispatch(itemRemoveRequested(itemId));
    try {
      const { content } = await itemService.remove(itemId);
      if (content === null) {
        dispatch(itemRemoved(itemId));
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

export const getItemsLoadingStatus = () => (state) => state.items.isLoading;
export const getItems = () => (state) => state.items.entities;

export default itemsReducer;
