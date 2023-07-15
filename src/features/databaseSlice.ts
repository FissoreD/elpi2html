import { createSlice } from "@reduxjs/toolkit"
import X from '../tests/test.json';

var pos = X.clauses.length - 20
var pos2 = pos + 20
var X1 = X.clauses.slice(pos, pos2)

type elpiDatabase = {
  db : any[]
}

const initialState : elpiDatabase = {
  db: X1
}

const DB_State = createSlice({
  name: "elpiDB",
  initialState, 
  reducers: {
    setDB(state, action) {
      state.db = action.payload;
    }
  }
})

export const { setDB } = DB_State.actions
export default DB_State.reducer