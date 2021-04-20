import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import visual from "./visual";

export default combineReducers({
  auth,
  message,
  visual
});
