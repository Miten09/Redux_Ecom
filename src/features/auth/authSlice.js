import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authTrue: (state) => {
      state.isAuth = true;
    },
    authFalse: (state) => {
      state.isAuth = false;
    },
  },
});

export const { authTrue, authFalse } = authSlice.actions;

export default authSlice.reducer;
