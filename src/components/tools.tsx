import React from "react"
import IntGenerator from "../generator"
import Dispatch from "./dispatch"
import { ParensMode, SymbolType, SymbolsList } from "./types"

export function Symbol({ shape }: SymbolType) {
  return <span className="symbol">{shape} </span>
}

export const putInFragment = (e: React.ReactNode) =>
  <React.Fragment key={IntGenerator.next().value!}>{e}</React.Fragment>

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

function parenthesizePrio(isInCommaPred: boolean, e: any) {
  return isInCommaPred && ((e.id === "propInfix" && [";", "=>"].includes(e.cnt.args[0].cnt)) || (e.id === "quantification"))
}

const displayListAux = (isInCommaPred : boolean, commas: boolean, height: number, len: number) => (hyp: any, pos: number): JSX.Element => {
  return putInFragment(
    <>{displayParenthesis(
      ParensMode.round,
      [displayList(height + 1, commas)(hyp)],
      parenthesizePrio(isInCommaPred, hyp))}
      {commas && pos + 1 < len ? <Symbol shape="," /> : <></>}
    </>
  )
}

export const displayList = (height: number, commas = true, isInCommaPred = false) => (hyp: any): JSX.Element => {
  if (Array.isArray(hyp)) {
    if (hyp.length === 0) return <></>
    if (hyp.length === 1) return displayListAux(isInCommaPred, commas, height, hyp.length)(hyp[0], 0)
    return putInFragment(displayParenthesis(ParensMode.round, hyp.map(displayListAux(isInCommaPred, commas, height, hyp.length)), height > 0))
  }
  return putInFragment(<Dispatch {...hyp} />)
}