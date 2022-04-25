import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "product categories",
  initialState: {
    categories: null,
    selectedCategory: null,
  },
  reducers: {
    updateCategory(state, action: PayloadAction<any>) {
      if (state.categories === null) {
        state.categories = action.payload;
      }
    },
  },
});

export const { updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
