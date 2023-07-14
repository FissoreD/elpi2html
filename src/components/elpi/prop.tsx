import { useState } from 'react';
import { displayHyp, displayParenthesis } from '../tools';
import { putInFragment, Symbol } from './misc';
import { ParensMode } from '../types';

interface PropType { cnt: any[] }

const putInParens = (e: any) => {
  if (Array.isArray(e) || ["prop", "propInfix"].includes(e.id)) {
    return putInFragment(displayParenthesis(ParensMode.round, [displayHyp(0, true)(e)]))
  } else {
    return putInFragment(displayHyp(0, true)(e))
  }
}

function Prop({ cnt }: PropType) {
  let [isHover, setIsHover] = useState(false) 
  let [hd, ...tl] = cnt;
  return (
    <span className={"prop " + (isHover ? "hover" : "")}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}>
      {displayHyp(0, false)(hd)}
      {tl.map(putInParens)}
    </span>
  )
}

export default Prop;
