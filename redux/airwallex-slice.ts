import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { airwallexType } from "@/types";

type payloadType = {
  accessToken: null | string;
  tokenExpiryDate: null | string;
};

type updatePaymentIntentType = {
  clientSecret: null | string;
  paymentIntentId: null | string;
};

const airwallexSlice = createSlice({
  name: "airwallexPayment",
  initialState: {
    isAccessTokenValid: false,
    accessToken: null,
    tokenExpiryDate: null,
    paymentIntentId: null,
    clientSecret: null,
    error: null,
    paymentSuccessful: null,
    isClientSecretValid: null,
  },
  reducers: {
    updateTokenStatus(
      state: airwallexType,
      action: PayloadAction<payloadType>
    ) {
      state.tokenExpiryDate = action.payload.tokenExpiryDate;
      state.accessToken = action.payload.accessToken;
    },
    paymentError(state, action) {
      state.error = action.payload;
    },
    updatePaymentIntent(
      state: airwallexType,
      action: PayloadAction<updatePaymentIntentType>
    ) {
      state.clientSecret = action.payload.clientSecret;
      state.paymentIntentId = action.payload.paymentIntentId;
    },
    updateClientSecretStatus(state, action) {
      state.isClientSecretValid = action.payload;
    },
    updateAccessTokenStatus(state, action) {
      state.isAccessTokenValid = action.payload;
    },
  },
});

export const {
  updateTokenStatus,
  paymentError,
  updatePaymentIntent,
  updateClientSecretStatus,
  updateAccessTokenStatus,
} = airwallexSlice.actions;
export default airwallexSlice.reducer;
