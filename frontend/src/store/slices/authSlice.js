import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";
import { clearWishlist } from "./wishlistSlice";

import {
  getCustomerStatus,
  logoutCustomer,
} from "../../shared/services/customer.service";

// Hydrates customer auth state from the httpOnly cookie on app load.
export const fetchCustomerStatus = createAsyncThunk(
  "auth/fetchCustomerStatus",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getCustomerStatus();
      return data.data.customer;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const logoutCustomerThunk = createAsyncThunk(
  "auth/logoutCustomer",
  async (_, { dispatch }) => {
    await logoutCustomer();
    localStorage.removeItem("user");
    localStorage.removeItem("7alps-cart"); // clear guest cart storage
    dispatch(clearCart()); // clear redux cart state
    dispatch(clearWishlist()); // clear redux wishlist state
    return null;
  },
);

const initialState = {
  customer: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
      state.status = "succeeded";
    },
    clearCustomer: (state) => {
      state.customer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload;
      })
      .addCase(fetchCustomerStatus.rejected, (state) => {
        state.status = "failed";
        state.customer = null;
      })
      .addCase(logoutCustomerThunk.fulfilled, (state) => {
        state.customer = null;
      });
  },
});

export const { setCustomer, clearCustomer } = authSlice.actions;

export const selectCustomer = (state) => state.auth.customer;
export const selectIsCustomerLoggedIn = (state) => Boolean(state.auth.customer);

export default authSlice.reducer;
