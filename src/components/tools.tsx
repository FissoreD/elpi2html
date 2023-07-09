import React from "react"
import IntGenerator from "../generator"
import Dispatch from "./dispatch"
import { Parens } from "./elpi/misc"
import { ParensSymbols } from "./types"

const displayParens = (height: number, shape: ParensSymbols) => {
  if (height > 1) return <Parens shape={shape} />
  return <></>
}

export const displayHyp = (height: number) => (hyp: any, pos: number): JSX.Element => {
  if (Array.isArray(hyp)) {
    if (hyp.length === 0) return <></>
    return <React.Fragment key={IntGenerator.next().value!}>
      {displayParens(height, "(")}
        {hyp.map(displayHyp(height + 1))}
      {displayParens(height, ")")},
    </React.Fragment>
  }
  return <React.Fragment key={IntGenerator.next().value!} > <Dispatch {...hyp} /> </React.Fragment>
}