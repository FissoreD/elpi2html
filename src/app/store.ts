import { Store, configureStore } from "@reduxjs/toolkit";
import setDB_Reducer from "../features/databaseSlice"

export const store = configureStore({
  reducer: {
    DB_State: setDB_Reducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>