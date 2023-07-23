import { configureStore } from "@reduxjs/toolkit";
import DB_State from "../features/databaseSlice"

export const store = configureStore({
  reducer: {
    DB_State
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>