import { createSlice } from "@reduxjs/toolkit";

const integrationSlice = createSlice({
  name: "integrations",
  initialState: {
    vbout: {
      createCart: false,
    },
  },
  reducers: {
    createCartVbout(state) {
      state.vbout.createCart = true;
    },
  },
});

export const { createCartVbout } = integrationSlice.actions;

export default integrationSlice.reducer;
