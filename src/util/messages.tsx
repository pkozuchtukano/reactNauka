import store from "../store";
import { setMessage } from "../actions/message";
import { extractErrorMessage } from "./http";
import {
  DANGER,
  WARNING,
  INFO,
  SUCCESS,
  DEFAULT,
  IMessagePayload,
} from "../types/messages";
import { uuidv4 } from "./util";

export const messageBuilder = {
  danger: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ): IMessagePayload => ({
    id: uuidv4(),
    body: body,
    type: DANGER,
    viewerInstanceKey: key,
    isPublic: isPublic,
  }),
  warning: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ): IMessagePayload => ({
    id: uuidv4(),
    body: body,
    type: WARNING,
    viewerInstanceKey: key,
    isPublic: isPublic,
  }),
  info: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ): IMessagePayload => ({
    id: uuidv4(),
    body: body,
    type: INFO,
    viewerInstanceKey: key,
    isPublic: isPublic,
  }),
  success: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ): IMessagePayload => ({
    id: uuidv4(),
    body: body,
    type: SUCCESS,
    viewerInstanceKey: key,
    isPublic: isPublic,
  }),
  default: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ): IMessagePayload => ({
    id: uuidv4(),
    body: body,
    type: DEFAULT,
    viewerInstanceKey: key,
    isPublic: isPublic,
  }),
};

export const messageSender = {
  danger: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ) => {
    const message = messageBuilder.danger(body, key, isPublic);
    store.dispatch(setMessage(message));
  },
  warning: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ) => {
    const message = messageBuilder.warning(body, key, isPublic);
    store.dispatch(setMessage(message));
  },
  info: (body: string, key: string | null = null, isPublic: boolean = true) => {
    const message = messageBuilder.info(body, key, isPublic);
    store.dispatch(setMessage(message));
  },
  success: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ) => {
    const message = messageBuilder.success(body, key, isPublic);
    store.dispatch(setMessage(message));
  },
  default: (
    body: string,
    key: string | null = null,
    isPublic: boolean = true
  ) => {
    const message = messageBuilder.default(body, key, isPublic);
    store.dispatch(setMessage(message));
  },
  apiError: (
    error: any,
    key: string | null = null,
    isPublic: boolean = true
  ) => {
    const message = extractErrorMessage(error);
    const errorMessage = messageBuilder.danger(message, key, isPublic);
    store.dispatch(setMessage(errorMessage));
  },
};
