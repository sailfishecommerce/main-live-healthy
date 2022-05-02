/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { paymentFormType } from '@/types'

type stateType = {
  paymentMethod: string | null
  country: string | null
  paymentForm: paymentFormType | null
  userAddress: any
  isShippingFormCompleted: boolean
  sendProductReview: boolean | null
}

const paymentSlice: any = createSlice({
  name: 'payment',
  initialState: {
    paymentMethod: null,
    country: null,
    userAddress: null,
    paymentForm: null,
    sendProductReview: null,
    submittedOrder: null,
    isShippingFormCompleted: false,
    stage: 1,
    proceedPayment: false,
    completeOrder: false,
  },
  reducers: {
    updateCompleteOrder(state, action) {
      state.completeOrder = action.payload
    },
    updatePaymentMethod(state: any, action: any) {
      state.paymentMethod = action.payload
    },
    updateCountry(state: stateType, action: any) {
      state.country = action.payload.country
    },
    updateUserAddress(state, action: any) {
      state.userAddress = action.payload
    },
    updatePaymentForm(state: stateType, action) {
      state.paymentForm = action.payload.form
      state.isShippingFormCompleted = action.payload.completed
    },
    sendProductReview(state: stateType, action: PayloadAction<boolean>) {
      state.sendProductReview = action.payload
    },
    updateSubmittedOrder(state, action) {
      state.submittedOrder = action.payload
    },
    resetProductReview(state) {
      state.sendProductReview = null
    },
    updateFormStage(state, action) {
      state.stage = action.payload
    },
    updatePaymentStatus(state) {
      state.proceedPayment = !state.proceedPayment
    },
  },
})

export const {
  updateCompleteOrder,
  updatePaymentMethod,
  updateCountry,
  updatePaymentForm,
  updateUserAddress,
  sendProductReview,
  updateSubmittedOrder,
  resetProductReview,
  updateFormStage,
  updatePaymentStatus,
} = paymentSlice.actions
export default paymentSlice.reducer
