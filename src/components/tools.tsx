import React from "react"
import Dispatch from "./dispatch"
import { ParensMode, SymbolType, SymbolsList } from "./types"
import { IntGenerator } from "../tools"

export function Symbol({ shape }: SymbolType) {
  return <span className="symbol">{shape} </span>
}

export const putInFragment = (e: React.ReactNode) =>
  <React.Fragment key={IntGenerator.next().value!}>{e}</React.Fragment>

export function Parenthesis({ type, cnt, cond }: { type: ParensMode, cnt: JSX.Element[], cond?: boolean }) {
  let dict: { [x in ParensMode]: SymbolsList[] } = {
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
  return isInCommaPred && ((e.id === "appInfix" && [";", "=>"].includes(e.cnt.args[0].cnt)) || (e.id === "quantification"))
}

const displayListAux = (isInCommaPred: boolean, commas: boolean, height: number, len: number) => (hyp: any, pos: number): JSX.Element => {
  return putInFragment(
    <><Parenthesis
      cnt={[displayList(height + 1, commas)(hyp)]}
      type={ParensMode.round} cond={parenthesizePrio(isInCommaPred, hyp)} />
      {commas && pos + 1 < len ? <Symbol shape="," /> : <></>}
    </>
  )
}

export const displayList = (height: number, commas = true, isInCommaPred = false) => (hyp: any): JSX.Element => {
  if (Array.isArray(hyp)) {
    if (hyp.length === 0) return <></>
    if (hyp.length === 1) return displayListAux(isInCommaPred, commas, height, hyp.length)(hyp[0], 0)
    return <Parenthesis type={ParensMode.round} cnt={hyp.map(displayListAux(isInCommaPred, commas, height, hyp.length))} cond={height > 0} />
  }
  return <Dispatch {...hyp} />
}