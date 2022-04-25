import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userDetailType = {
  firstName: string;
  lastName: string;
  email: string;
};

type authSliceStateType = {
  loading: null | string | boolean;
  authorized: boolean;
  userDetail: userDetailType;
  error: null | boolean;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: null,
    authorized: false,
    userDetail: {
      firstName: "",
      lastName: "",
      email: "",
    },
    error: null,
  },
  reducers: {
    authRequest(state: authSliceStateType, action: PayloadAction<string>) {
      state.loading = action.payload;
    },
    authorizeUser(
      state: authSliceStateType,
      action: PayloadAction<userDetailType>
    ) {
      state.loading = false;
      state.authorized = true;
      state.userDetail = action.payload;
    },
    authorizeError(state: authSliceStateType) {
      state.loading = false;
      state.error = true;
    },
    logout(state) {
      state.authorized = false;
      state.userDetail = {
        firstName: "",
        lastName: "",
        email: "",
      };
    },
  },
});

export const { authRequest, authorizeUser, authorizeError, logout } =
  authSlice.actions;

export default authSlice.reducer;
