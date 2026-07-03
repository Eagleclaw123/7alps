import { configureStore } from "@reduxjs/toolkit";

import cartReducer, { persistCart } from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  const { cart } = store.getState();
  persistCart(cart);
});

export default store;
