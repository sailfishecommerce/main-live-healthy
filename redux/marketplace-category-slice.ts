import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  selectedCategory: any;
};

const marketplaceCategorySlice = createSlice({
  name: "marketplace-category",
  initialState: {
    selectedCategory: [],
  },
  reducers: {
    updateMarketplaceCategory(state: stateType, action: PayloadAction<string>) {
      state.selectedCategory = [...state.selectedCategory, action.payload];
    },
    resetMarketplaceCategory(state: stateType) {
      state.selectedCategory = [];
    },
  },
});

export const { updateMarketplaceCategory, resetMarketplaceCategory } =
  marketplaceCategorySlice.actions;

export default marketplaceCategorySlice.reducer;
