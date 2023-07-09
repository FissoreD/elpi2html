import { useState } from 'react';
import { displayHyp } from '../tools';
import { putInFragment, Symbol } from './misc';

interface PropType { cnt: any[] }

const putInParens = (e: any) => {
  if (Array.isArray(e) || ["prop", "propInfix"].includes(e.id)) {
    return putInFragment(<><Symbol shape="(" />{displayHyp(0, true)(e)} <Symbol shape=")" /></>)
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
      {/* {displayHyp(0, false)(tl)} */}
    </span>
  )
}

export default Prop;
