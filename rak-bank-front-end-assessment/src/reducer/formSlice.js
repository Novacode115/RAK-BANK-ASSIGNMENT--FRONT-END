import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  errors: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setFullName, setEmail, setPassword, setErrors } =
  formSlice.actions;
export default formSlice.reducer;
