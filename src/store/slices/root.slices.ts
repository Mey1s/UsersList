import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user.slice";

export default combineReducers({
  user: userSlice,
});
