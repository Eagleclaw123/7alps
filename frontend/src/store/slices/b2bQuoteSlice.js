import { createSlice } from "@reduxjs/toolkit";

// Draft quote the B2B member is building in Catalog before submitting it from
// Request Quote. Purely client-side — nothing is persisted server-side until submit.
export const makeDraftItemId = (productId, variantLabel) =>
  `${productId}::${variantLabel}`;

const initialState = {
  items: [],
};

const b2bQuoteSlice = createSlice({
  name: "b2bQuote",
  initialState,
  reducers: {
    addDraftItem: (state, action) => {
      const { productId, variantLabel, name, listedPrice, proposedPrice, quantity } =
        action.payload;
      const id = makeDraftItemId(productId, variantLabel);
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity += quantity;
        existing.proposedPrice = proposedPrice;
      } else {
        state.items.push({
          id,
          productId,
          variantLabel,
          name,
          listedPrice,
          proposedPrice,
          quantity,
        });
      }
    },

    updateDraftItem: (state, action) => {
      const { id, quantity, proposedPrice } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (!item) return;
      if (quantity !== undefined) item.quantity = quantity;
      if (proposedPrice !== undefined) item.proposedPrice = proposedPrice;
    },

    removeDraftItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearDraft: (state) => {
      state.items = [];
    },
  },
});

export const { addDraftItem, updateDraftItem, removeDraftItem, clearDraft } =
  b2bQuoteSlice.actions;

export const selectDraftItems = (state) => state.b2bQuote.items;

export const selectDraftCount = (state) => state.b2bQuote.items.length;

export const selectDraftTotal = (state) =>
  state.b2bQuote.items.reduce(
    (total, item) => total + Number(item.proposedPrice || 0) * Number(item.quantity || 1),
    0,
  );

export default b2bQuoteSlice.reducer;
