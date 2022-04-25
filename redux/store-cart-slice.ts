import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storeCartSlice = createSlice({
  name: "storeCart",
  initialState: {
    cart: {
      items: [],
      display_currency: null,
      cartId: null,
    },
  },
  reducers: {
    updateStoreCartItem(state: any, action: PayloadAction<any>) {
      state.cart.items = [...state.cart.items, action.payload];
    },
    updateStoreCartCurrency(state, action: PayloadAction<any>) {
      state.cart.display_currency = action.payload;
    },
    updateCartId(state: any, action: PayloadAction<any>) {
      state.cart.cartId = action.payload;
    },
  },
});

export const { updateStoreCartCurrency, updateStoreCartItem, updateCartId } =
  storeCartSlice.actions;
export default storeCartSlice.reducer;
