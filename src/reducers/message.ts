import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  IMessageAction,
  IMessageState,
} from "../types/messages";

const initialState: IMessageState = { message: null };

export default function message(
  state: IMessageState = initialState,
  action: IMessageAction
): IMessageState {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: null };

    default:
      return state;
  }
}
