import { createSlice } from "@reduxjs/toolkit";

import { calcTotalPrice } from "../utils/calculations";

const dataLS = localStorage.getItem("cart");
const itemsLS = dataLS ? JSON.parse(dataLS) : [];
const totalPriceLS = calcTotalPrice(itemsLS);

const initialState = {
  items: itemsLS,
  totalPrice: totalPriceLS
};

function findItem(arr, obj) {
  return arr.find((data) => data._id === obj._id);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = findItem(state.items, action.payload);

      if (item) {
        item.count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    plusItem: (state, action) => {
      const item = findItem(state.items, action.payload);
      item.count += 1;
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action) => {
      const item = findItem(state.items, action.payload);

      if (item.count > 1) {
        item.count -= 1;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

const { reducer: cartReducer, actions } = cartSlice;
export const { addItem, plusItem, minusItem, removeItem, clearItems } = actions;

export const getCartItems = () => (state) => state.cart.items;
export const getTotalPrice = () => (state) => state.cart.totalPrice;

export default cartReducer;
