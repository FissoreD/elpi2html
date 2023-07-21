import { createSlice } from "@reduxjs/toolkit"
import X from '../tests/test.json';
import { listNoDup, filePathFromTitle } from "../tools";

var pos = 0 //X.clauses.length - 20
var pos2 = pos + X.clauses.length //+ 20
var X1 = X.clauses.slice(pos, pos2)

type elpiDatabase = {
  db: any[],
  filter: string,
  pathName: string,
  predicates: string[],
  fileNames: string[]
}

const initialState : elpiDatabase = {
  db: X1,
  filter: "",
  pathName: "",
  predicates: listNoDup(X1.map(x => x.predicate)),
  fileNames: listNoDup(X1.map(x => filePathFromTitle(x.title))),
}

const DB_State = createSlice({
  name: "elpiDB",
  initialState, 
  reducers: {
    setDB(state, action) {
      console.log("Opening file")
      state.db = action.payload;
      state.predicates = listNoDup(action.payload.map((x: any) => x.predicate))
      state.fileNames = listNoDup(action.payload.map((x: any) => filePathFromTitle(x.title)))
    },
    setFilterDB(state, action) {
      console.log("Setting predicate filter:", action.payload)
      state.filter = action.payload
    },
    setFilterFileName(state, action) {
      console.log("Setting file name:", action.payload)
      state.pathName = action.payload
    },
    setPredicatesDB(state, action) {
      state.predicates = action.payload
    }
  }
})

export const { setDB, setFilterDB, setPredicatesDB, setFilterFileName } = DB_State.actions
export default DB_State.reducer