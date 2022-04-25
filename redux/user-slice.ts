import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userToken: null,
  },
  reducers: {
    updateUserDetails(state, action: PayloadAction<any>) {
      state.userToken = action.payload;
    },
  },
});

export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
