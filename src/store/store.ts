import { configureStore } from "@reduxjs/toolkit";
import {userFilterSlice} from "../slices";

export const store = configureStore({
 reducer: {
  users: userFilterSlice
 }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;