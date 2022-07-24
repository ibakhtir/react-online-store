import { combineReducers, configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users";
import itemsReducer from "./items";
import commentsReducer from "./comments";
import categoriesReducer from "./categories";
import cartReducer from "./cart";
import filterReducer from "./filter";
import alertsReducer from "./alerts";

const rootReducer = combineReducers({
  users: usersReducer,
  items: itemsReducer,
  comments: commentsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  filter: filterReducer,
  alerts: alertsReducer
});

export default function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
