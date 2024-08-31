import axios from "axios";
//import store from "../store";

const instance = axios.create({
  baseURL: "http://localhost:8080/users",
});

instance.interceptors.request.use(
  (config) => {
    //const state = store.getState();
    const sessionId = 123;

    if (sessionId) {
      config.headers["Session-ID"] = sessionId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
