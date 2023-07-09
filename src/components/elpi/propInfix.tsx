import { ClauseType } from '../types';
import { displayHyp } from '../tools';
import Dispatch from '../dispatch';
import { useState } from 'react';

function PropInfix({ args }: ClauseType) {
  let [infOp, left, right] = args;
  let [isHover, setIsHover] = useState(false)
  return (
    <span className={"prop " + (isHover ? "hover" : "")}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}>
      {displayHyp(0)(left)}
      <span className="infix">
        <Dispatch {...infOp} />
      </span>
      {displayHyp(0)(right)}
    </span>
  )
}

export default PropInfix;
