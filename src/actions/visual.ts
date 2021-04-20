import {
  SET_ADMIN_MODE,
  CLEAR_ADMIN_MODE,
  IVisualAction,
  IVisualPayload,
} from "../types/visuals";

export const setAdminMode = (payload: IVisualPayload): IVisualAction => ({
  type: SET_ADMIN_MODE,
  payload: payload,
});

export const clearAdminMode = (): IVisualAction => ({
  type: CLEAR_ADMIN_MODE,
  payload: null,
});
