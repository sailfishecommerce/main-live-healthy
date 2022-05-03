/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
  },
  reducers: {
    updateCart(state, action: PayloadAction<any>) {
      state.cart = action.payload
    },
  },
})

export const { updateCart } = cartSlice.actions
export default cartSlice.reducer
