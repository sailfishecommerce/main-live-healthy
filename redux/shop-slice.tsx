import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "Shop",
  initialState: {
    productView: "grid",
    filter: null,
  },
  reducers: {
    updateProductView(state, action: PayloadAction<"grid" | "list">) {
      state.productView = action.payload;
    },
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { updateProductView, updateFilter } = shopSlice.actions;
export default shopSlice.reducer;
