import { createSlice } from "@reduxjs/toolkit"
import X from '../tests/test.json';

var pos = X.clauses.length - 20
var pos2 = pos + 20
var X1 = X.clauses.slice(pos, pos2)

type elpiDatabase = {
  db: any[],
  filter: string
}

const initialState : elpiDatabase = {
  db: X1,
  filter: ""
}

const DB_State = createSlice({
  name: "elpiDB",
  initialState, 
  reducers: {
    setDB(state, action) {
      state.db = action.payload;
    },
    setFilterDB(state, action) {
      state.filter = action.payload
    }
  }
})

export const { setDB, setFilterDB } = DB_State.actions
export default DB_State.reducer