import { createSlice } from "@reduxjs/toolkit";
import axios from "../api/axiosConfig";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: null,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.sessionId = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    logout: (state) => {
      state.sessionId = null;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("/login", {
      email,
      password,
    });
    const sessionId = response.data.data;
    console.log(sessionId);
    dispatch(loginSuccess(sessionId));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error.response.data.message));
  }
};
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
