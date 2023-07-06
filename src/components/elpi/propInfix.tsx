import { ClauseType } from '../types';
import { Parens } from './misc';
import { displayHyp } from '../tools';
import Dispatch from '../dispatch';

function PropInfix({ args }: ClauseType) {
  let [infOp, left, right] = args;
  return (
    <>
      <Parens shape="(" />
      {displayHyp(0)(left,0)}
      <span className="infix">
        <Dispatch {...infOp} />
      </span>
      {displayHyp(0)(right,0)}
      <Parens shape=")" />
    </>
  )
}

export default PropInfix;
