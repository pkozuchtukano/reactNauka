import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  IMessageAction,
  IMessagePayload,
} from "../types/messages";

export const setMessage = (message: IMessagePayload): IMessageAction => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = (): IMessageAction => ({
  type: CLEAR_MESSAGE,
  payload: null,
});
