import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: null,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      //console.log("inside login success action payload  ", action.payload);
      state.sessionId = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.sessionId = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
