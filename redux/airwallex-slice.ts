/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { airwallexType } from '@/types'

type payloadType = {
  accessToken: string | null
  tokenExpiryDate: string | null
}

type updatePaymentIntentType = {
  clientSecret: string | null
  paymentIntentId: string | null
}

const airwallexSlice = createSlice({
  name: 'airwallexPayment',
  initialState: {
    isAccessTokenValid: false,
    accessToken: null,
    airwallexState: null,
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
      state.tokenExpiryDate = action.payload.tokenExpiryDate
      state.accessToken = action.payload.accessToken
    },
    paymentError(state, action) {
      state.error = action.payload
    },
    updatePaymentIntent(
      state: airwallexType,
      action: PayloadAction<updatePaymentIntentType>
    ) {
      state.clientSecret = action.payload.clientSecret
      state.paymentIntentId = action.payload.paymentIntentId
    },
    updateClientSecretStatus(state, action) {
      state.isClientSecretValid = action.payload
    },
    updateAccessTokenStatus(state, action) {
      state.isAccessTokenValid = action.payload
    },
    updateAirwallexState(state, action) {
      state.airwallexState = action.payload
    },
  },
})

export const {
  updateTokenStatus,
  paymentError,
  updatePaymentIntent,
  updateClientSecretStatus,
  updateAccessTokenStatus,
  updateAirwallexState,
} = airwallexSlice.actions
export default airwallexSlice.reducer
