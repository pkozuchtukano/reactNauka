export type MessageActionType = "SET_MESSAGE" | "CLEAR_MESSAGE";
export const SET_MESSAGE: MessageActionType = "SET_MESSAGE";
export const CLEAR_MESSAGE: MessageActionType = "CLEAR_MESSAGE";

export type MessageVisualType =
  | "danger"
  | "warning"
  | "info"
  | "success"
  | "default";

export const DANGER: MessageVisualType = "danger";
export const WARNING: MessageVisualType = "warning";
export const INFO: MessageVisualType = "info";
export const SUCCESS: MessageVisualType = "success";
export const DEFAULT: MessageVisualType = "default";

export interface IMessagePayload {
  id: string;
  body: string | string[];
  type: MessageVisualType;
  viewerInstanceKey: string | null;
  isPublic: Boolean;
}

export interface IMessageAction {
  payload: IMessagePayload | null;
  type: MessageActionType;
}

export interface IMessageState {
  message: IMessagePayload | null;
}
