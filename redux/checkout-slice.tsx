import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type checkoutPayloadType =
  | "cart"
  | "details"
  | "shipping"
  | "payment"
  | "review"
  | "complete";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    loading: false,
    checkout: "details",
  },
  reducers: {
    updateCheckoutProcess(state, action: PayloadAction<checkoutPayloadType>) {
      state.checkout = action.payload;
    },
    updateLoadingStatus(state, action: PayloadAction<true | false>) {
      state.loading = action.payload;
    },
  },
});

export const { updateCheckoutProcess ,updateLoadingStatus} = checkoutSlice.actions;
export default checkoutSlice.reducer;
