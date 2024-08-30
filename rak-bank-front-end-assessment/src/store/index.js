import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../reducer/formSlice";
import authReducer from "../reducer/authSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authReducer,
  },
});

export default store;
