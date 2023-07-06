import React from "react"
import IntGenerator from "../generator"
import Dispatch from "./dispatch"
import { Parens } from "./elpi/misc"

export const displayHyp = (height: number) => (hyp: any, pos: number): JSX.Element => {
  if (Array.isArray(hyp)) {
    if (hyp.length === 0) return <></>
    else if (height > 1)
      return <><Parens shape='(' /> {hyp.map(displayHyp(height + 1))}<Parens shape=')' /></>
    else
      return <>{hyp.map(displayHyp(height + 1))}</>
  }
  return <React.Fragment key={IntGenerator.next().value!} > <Dispatch {...hyp} /> </React.Fragment>
}