import { createSlice } from "@reduxjs/toolkit"
import X from '../tests/test.json';
import { listNoDup, filePathFromTitle } from "../tools";

var pos = 0 //X.clauses.length - 20
var pos2 = pos + X.clauses.length 
var X1 = X.clauses.slice(pos, pos2)

type elpiDatabase = {
  db: any[],
  filter: string,
  pathName: string,
  predicates: string[],
  fileNames: string[],
  // if a variable is active
  variables: {[varId: number]: boolean}
}

const initialState : elpiDatabase = {
  db: X1,
  filter: "",
  pathName: "",
  predicates: listNoDup(X1.map(x => x.predicate)),
  fileNames: listNoDup(X1.map(x => filePathFromTitle(x.title))),
  variables: {}
}

let getAllVarId = (json: any) : number[] => {
  if (json === undefined) return []
  if (Array.isArray(json)) {
    return json.map(e => getAllVarId(e.cnt)).flat()
  } 
  return json.id === "var" ? [json.cnt.varId as number] : getAllVarId(json.cnt)
}

const DB_State = createSlice({
  name: "elpiDB",
  initialState, 
  reducers: {
    setDB(state, action) {
      let {payload} = action
      console.log("Opening file")
      state.db = payload;
      state.predicates = listNoDup(payload.map((x: any) => x.predicate))
      state.fileNames = listNoDup(payload.map((x: any) => filePathFromTitle(x.title)))
      getAllVarId(payload).forEach(v => state.variables[v] = false)
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
    },
    // addVariable(state, action: { payload: { varId: number }; type: string }) {
    //   let { varId } = action.payload;
    //   state.variables[varId] = false
    // },
    setActive(state, action: { payload: { varId: number, isActive: boolean }; type: string }) {
      state.variables[action.payload.varId] = action.payload.isActive
    }
  }
})

export const { setDB, setFilterDB, setPredicatesDB, setFilterFileName, setActive } = DB_State.actions
export default DB_State.reducer