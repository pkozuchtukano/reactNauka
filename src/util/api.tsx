import axios from "axios";
import store from "../store";
import { history } from "./history";
import { LOGIN_SUCCESS } from "../types/auth";

let instance = axios.create();
instance.defaults.baseURL = "https://localhost:44306/api/v1/";

instance.interceptors.request.use((request) => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    request.headers.common["Authorization"] = "Bearer " + userToken;
  }

  return request;
});

instance.interceptors.response.use(
  (request) => request,
  (err) => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;

      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        let res = fetch("https://localhost:44306/api/v1/auth/refresh-token", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Device: "device",
          },
          credentials: "same-origin",
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify({
            Token: localStorage.getItem("refreshToken"),
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.noToken) {
              localStorage.removeItem("userToken");
              localStorage.removeItem("refreshToken");

              history.push("/login");
              window.location.reload();
            } else {
              localStorage.setItem("userToken", res.token);
              localStorage.setItem("refreshToken", res.refreshToken);

              store.dispatch({
                type: LOGIN_SUCCESS,
                payload: { userToken: res.token },
              });

              originalReq.headers["Authorization"] = "Bearer " + res.token;
              return axios(originalReq);
            }
          });

        resolve(res);
      }

      reject(err);
    });
  }
);

export default instance;
