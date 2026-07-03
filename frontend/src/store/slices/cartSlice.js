import { createSlice } from "@reduxjs/toolkit";

import { cartData } from "../../features/cart/data/cartData";

const CART_STORAGE_KEY = "7alps-cart";

const loadCartFromStorage = () => {
  if (typeof window === "undefined") {
    return cartData;
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return cartData;
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : cartData;
  } catch {
    return cartData;
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) {
        return;
      }

      existingItem.quantity =
        type === "increase"
          ? existingItem.quantity + 1
          : Math.max(1, existingItem.quantity - 1);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const selectShipping = (state) => {
  const subtotal = selectSubtotal(state);
  return subtotal > 999 ? 0 : 99;
};

export const selectTotal = (state) => {
  const subtotal = selectSubtotal(state);
  const shipping = selectShipping(state);
  return subtotal + shipping;
};

export const persistCart = (state) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }
};

export default cartSlice.reducer;
