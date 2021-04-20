import {
  SET_ADMIN_MODE,
  CLEAR_ADMIN_MODE,
  IVisualAction,
  IVisualState,
} from "../types/visuals";

const initialState: IVisualState = { adminMode: null };

export default function visualMode(
  state: IVisualState = initialState,
  action: IVisualAction
): IVisualState {
  const { type, payload } = action;

  switch (type) {
    case SET_ADMIN_MODE:
      return {
        ...state,
        adminMode: payload?.adminMode || null
      };

    case CLEAR_ADMIN_MODE:
      return {
        ...state,
        adminMode: null,
      };

    default:
      return state;
  }
}
