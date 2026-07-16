import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCart as fetchCartApi,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearServerCart,
} from "../../shared/services/cart.service";
import { getProductImageUrl } from "../../features/products/utils/normalizeProduct";

const CART_STORAGE_KEY = "7alps-cart";

const isLoggedIn = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return Boolean(user && user.role === "customer");
  } catch {
    return false;
  }
};

export const makeItemId = (productId, variantLabel) =>
  `${productId}::${variantLabel}`;

export const parseItemId = (id) => {
  const [productId, variantLabel] = id.split("::");
  return { productId, variantLabel };
};

const normalizeServerCartItems = (items = []) =>
  items.map((item) => ({
    id: makeItemId(item.product, item.variantLabel),
    productId: item.product,
    variantLabel: item.variantLabel,
    weight: item.variantLabel,
    name: item.name,
    image: getProductImageUrl(item.image),
    category: item.category,
    price: item.price,
    quantity: item.quantity,
  }));

const loadGuestCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistGuestCart = (items) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
};

const initialState = {
  items: loadGuestCart(),
  status: "idle",
};

// Loads the cart: server-backed for a logged-in customer, localStorage otherwise.
export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  if (!isLoggedIn()) return loadGuestCart();
  const { data } = await fetchCartApi();
  return normalizeServerCartItems(data?.data?.cart?.items);
});

export const addToCart = createAsyncThunk(
  "cart/addItem",
  async (
    { productId, variantLabel, quantity = 1, name, image, category, price },
    { getState },
  ) => {
    if (isLoggedIn()) {
      const { data } = await addCartItem(productId, variantLabel, quantity);
      return normalizeServerCartItems(data?.data?.cart?.items);
    }

    const items = getState().cart.items.map((item) => ({ ...item }));
    const id = makeItemId(productId, variantLabel);
    const existing = items.find((item) => item.id === id);
    if (existing) {
      existing.quantity += quantity;
      if (name) existing.name = name;
      if (image) existing.image = image;
      if (category) existing.category = category;
      if (price !== undefined) existing.price = Number(price);
    } else {
      items.push({
        id,
        productId,
        variantLabel,
        weight: variantLabel,
        name: name || "Product",
        image,
        category: category || "General",
        price: Number(price || 0),
        quantity,
        inStock: true,
      });
    }
    persistGuestCart(items);
    return items;
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, variantLabel, type }, { getState }) => {
    if (isLoggedIn()) {
      const { data } = await updateCartItemQuantity(
        productId,
        variantLabel,
        type,
      );
      return normalizeServerCartItems(data?.data?.cart?.items);
    }

    const id = makeItemId(productId, variantLabel);
    let items = getState().cart.items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              type === "increase"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item,
    );
    persistGuestCart(items);
    return items;
  },
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeItem",
  async ({ productId, variantLabel }, { getState }) => {
    if (isLoggedIn()) {
      const { data } = await removeCartItem(productId, variantLabel);
      return normalizeServerCartItems(data?.data?.cart?.items);
    }

    const id = makeItemId(productId, variantLabel);
    const items = getState().cart.items.filter((item) => item.id !== id);
    persistGuestCart(items);
    return items;
  },
);

export const clearCartAsync = createAsyncThunk("cart/clear", async () => {
  if (isLoggedIn()) {
    await clearServerCart();
  } else {
    persistGuestCart([]);
  }
  return [];
});

// Called right after a customer logs in: pushes any guest (localStorage) cart
// items into the server cart, then hydrates state from the merged server cart.
export const mergeGuestCartOnLogin = createAsyncThunk(
  "cart/mergeGuestOnLogin",
  async () => {
    const guestItems = loadGuestCart();

    for (const item of guestItems) {
      await addCartItem(item.productId, item.variantLabel, item.quantity);
    }

    persistGuestCart([]);

    const { data } = await fetchCartApi();
    return normalizeServerCartItems(data?.data?.cart?.items);
  },
);

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
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (cartItem) => cartItem.id !== action.payload,
        );
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    const setItems = (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    };

    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, setItems)
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToCart.fulfilled, setItems)
      .addCase(updateQuantity.fulfilled, setItems)
      .addCase(removeCartItemAsync.fulfilled, setItems)
      .addCase(clearCartAsync.fulfilled, setItems)
      .addCase(mergeGuestCartOnLogin.fulfilled, setItems);
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartStatus = (state) => state.cart.status;

export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

export const selectShipping = (state) => {
  const subtotal = selectSubtotal(state);
  return state.cart.items.length && subtotal <= 999 ? 99 : 0;
};

export const selectTotal = (state) =>
  selectSubtotal(state) + selectShipping(state);

export default cartSlice.reducer;
