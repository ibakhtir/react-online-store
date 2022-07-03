import { combineReducers, configureStore } from "@reduxjs/toolkit";

import usersReducer from "./users";
import itemsReducer from "./items";

const rootReducer = combineReducers({
  users: usersReducer,
  items: itemsReducer
});

export default function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
