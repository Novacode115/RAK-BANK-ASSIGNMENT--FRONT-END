import axios from "../api/axiosConfig";
import { loginSuccess, loginFailure } from "./authSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("/login", { email, password });
    const sessionId = response.data.data;
    console.log(sessionId);
    dispatch(loginSuccess(sessionId));
  } catch (error) {
    console.log(error);
    dispatch(
      loginFailure(loginFailure(error.response?.data?.error || "Login failed"))
    );
  }
};
