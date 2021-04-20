import { Dispatch } from "redux";
import { messageSender } from "../util/messages";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  IAuthAction,
} from "../types/auth";
import AuthService from "../services/auth.service";

export const register = (email: string, password: string) => (
  dispatch: Dispatch<IAuthAction>
) => {
  return AuthService.register(email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: null,
      });

      messageSender.success(response.data.message, "register");
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: REGISTER_FAIL,
        payload: null,
      });

      messageSender.apiError(error, "register");
      return Promise.reject();
    }
  );
};

export const login = (username: string, password: string) => (
  dispatch: Dispatch<IAuthAction>
) => {
  return AuthService.login(username, password).then(
    (userToken) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { userToken },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });

      messageSender.apiError(error, "login");
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch: Dispatch<IAuthAction>) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
