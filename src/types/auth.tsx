export type UserRoleType = "ROLE_APPLICATION_ADMIN" | "ROLE_USER";
export const ROLE_USER: UserRoleType = "ROLE_USER";
export const ROLE_ADMIN: UserRoleType = "ROLE_APPLICATION_ADMIN";

export type AuthActionType =
  | "REGISTER_SUCCESS"
  | "REGISTER_FAIL"
  | "LOGIN_SUCCESS"
  | "LOGIN_FAIL"
  | "LOGOUT";
export const REGISTER_SUCCESS: AuthActionType = "REGISTER_SUCCESS";
export const REGISTER_FAIL: AuthActionType = "REGISTER_FAIL";
export const LOGIN_SUCCESS: AuthActionType = "LOGIN_SUCCESS";
export const LOGIN_FAIL: AuthActionType = "LOGIN_FAIL";
export const LOGOUT: AuthActionType = "LOGOUT";

export interface IAuthPayload {
  userToken: String | null;
  isLoggedIn?: Boolean;
}

export interface IAuthAction {
  payload?: IAuthPayload | null;
  type: AuthActionType;
}

export interface IAuthState {
  userToken: String | null;
  isLoggedIn: Boolean;
}
