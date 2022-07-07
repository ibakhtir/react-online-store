import { combineReducers, configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users";
import itemsReducer from "./items";
import cartReducer from "./cart";
import filterReducer from "./filter";

const rootReducer = combineReducers({
  users: usersReducer,
  items: itemsReducer,
  cart: cartReducer,
  filter: filterReducer
});

export default function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
