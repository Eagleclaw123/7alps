import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getWishlist,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
} from "../../shared/services/wishlist.service";
import { normalizeProducts } from "../../features/products/utils/normalizeProduct";

const isLoggedIn = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return Boolean(user && user.role === "customer");
  } catch {
    return false;
  }
};

// Wishlist is customer-only (no guest fallback, unlike cart) — returns an
// empty list for guests instead of hitting the API.
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  if (!isLoggedIn()) return [];
  const { data } = await getWishlist();
  return normalizeProducts(data?.data?.products);
});

export const toggleWishlistItem = createAsyncThunk(
  "wishlist/toggle",
  async (productId, { getState }) => {
    const alreadyWishlisted = getState().wishlist.productIds.includes(productId);
    if (alreadyWishlisted) {
      await removeFromWishlistApi(productId);
    } else {
      await addToWishlistApi(productId);
    }
    return { productId, wishlisted: !alreadyWishlisted };
  },
);

const initialState = {
  items: [],
  productIds: [],
  status: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.productIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.productIds = action.payload.map((product) => product.id);
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        const { productId, wishlisted } = action.payload;
        if (wishlisted) {
          if (!state.productIds.includes(productId)) {
            state.productIds.push(productId);
          }
        } else {
          state.productIds = state.productIds.filter((id) => id !== productId);
          state.items = state.items.filter((product) => product.id !== productId);
        }
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistIds = (state) => state.wishlist.productIds;
export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.productIds.includes(productId);
export const selectWishlistCount = (state) => state.wishlist.productIds.length;

export default wishlistSlice.reducer;
