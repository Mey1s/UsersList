import { configureStore } from "@reduxjs/toolkit";
import rootSlices from "./slices/root.slices";

export const store = configureStore({
  reducer: rootSlices,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
