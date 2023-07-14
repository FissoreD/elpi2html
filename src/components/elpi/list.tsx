import { ListType, ParensMode } from '../types';
import { Symbol } from './misc';
import { displayHyp, displayParenthesis } from '../tools';

let printTl = (tl?: any) => {
  if (tl) {
    return <> <Symbol shape="|" /> { displayHyp(-1)(tl) } </>
  }
  return <></>
}

function List({ l, tl }: ListType) {
  return (displayParenthesis(ParensMode.square, [displayHyp(0, true)(l), printTl(tl)]))
}

export default List;
