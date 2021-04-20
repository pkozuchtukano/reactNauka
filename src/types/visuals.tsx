export type VisualActionType = "SET_ADMIN_MODE" | "CLEAR_ADMIN_MODE";
export const SET_ADMIN_MODE: VisualActionType = "SET_ADMIN_MODE";
export const CLEAR_ADMIN_MODE: VisualActionType = "CLEAR_ADMIN_MODE";

export type AdminMode =
  | "dashboard"
  | "users";

export const DASHBOARD: AdminMode = "dashboard";
export const USERS: AdminMode = "users";

export interface IVisualPayload {
  adminMode: AdminMode;
}

export interface IVisualAction {
  payload: IVisualPayload | null;
  type: VisualActionType;
}

export interface IVisualState {
  adminMode: AdminMode | null;
}
