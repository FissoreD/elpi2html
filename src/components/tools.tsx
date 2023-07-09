import Dispatch from "./dispatch"
import { Symbol, putInFragment } from "./elpi/misc"
import { SymbolsList } from "./types"

const displayParens = (height: number, shape: SymbolsList) => {
  if (height > 0) return <Symbol shape={shape} />
  return <></>
}

const displayHypList = (commas: boolean, height: number, len: number) => (hyp: any, pos:number): JSX.Element => {
  return putInFragment(<>{displayHyp(height + 1, commas)(hyp)} {commas && pos + 1 < len ? "," : ""}</>)
}

export const displayHyp = (height: number, commas = true) => (hyp: any): JSX.Element => {
  if (Array.isArray(hyp)) {
    if (hyp.length === 0) return <></>
    return putInFragment(<>
        {displayParens(height, "(")}
        {hyp.map(displayHypList(commas, height, hyp.length))}
        {displayParens(height, ")")}
      </>)
  }
  return putInFragment(<Dispatch {...hyp} />)
}