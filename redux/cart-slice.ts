import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useCartType } from "@/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,    
  },
  reducers: {
    updateCart(state: useCartType, action: PayloadAction<any>) {
      state.cart = action.payload;
    },
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
