import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import b2bQuoteReducer from "./slices/b2bQuoteSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    b2bQuote: b2bQuoteReducer,
  },
});

export default store;
