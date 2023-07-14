import { ListType, ParensMode } from '../types';
import { Symbol } from './misc';
import { displayList, displayParenthesis } from '../tools';

let printTl = (tl?: any) => {
  if (tl) {
    return <> <Symbol shape="|" /> { displayList(-1)(tl) } </>
  }
  return <></>
}

function List({ l, tl }: ListType) {
  return <span className='list'> { displayParenthesis(ParensMode.square, [displayList(-1, true)(l), printTl(tl)]) } </span>
}

export default List;
