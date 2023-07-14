import Dispatch from "./dispatch"
import { Symbol, putInFragment } from "./elpi/misc"
import { ParensMode, SymbolsList } from "./types"

export const displayParenthesis = (type: ParensMode, cnt: JSX.Element[], cond=true) => {
  let dict : {[x in ParensMode] : SymbolsList[]} = {
    [ParensMode.round]: ["(", ")"],
    [ParensMode.square]: ["[", "]"],
    [ParensMode.curly]: ["{", "}"]
  }
  return <span className="parens">
    {cond ? <Symbol shape={dict[type][0]} /> : <></>}
      {cnt.map(putInFragment)}
    {cond ? <Symbol shape={dict[type][1]} /> : <></>}
  </span>
}

const displayHypList = (commas: boolean, height: number, len: number) => (hyp: any, pos:number): JSX.Element => {
  return putInFragment(
    // <span className="block">
    <>{displayList(height + 1, commas)(hyp)} {commas && pos + 1 < len ? <Symbol shape="," /> : ""}</>
    // </span >
    )
}

export const displayList = (height: number, commas = true) => (hyp: any): JSX.Element => {
  if (Array.isArray(hyp)) {
    if (hyp.length === 0) return <></>
    if (hyp.length === 1) return displayHypList(commas, height, hyp.length)(hyp[0], 0)
    return putInFragment(displayParenthesis(ParensMode.round, hyp.map(displayHypList(commas, height, hyp.length)), height > 0))
  }
  return putInFragment(<Dispatch {...hyp} />)
}