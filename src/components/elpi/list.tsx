import { ListType } from '../types';
import { Parens } from './misc';
import { displayHyp } from '../tools';

let printTl = (tl?: any) => {
  if (tl) {
    return <> <Parens shape="|" /> { displayHyp(0)(tl,0) } </>
  }
  return <></>
}

function List({ l, tl }: ListType) {
  
  return (
    <div className='list'>
      <Parens shape='[' />
      {l.map(displayHyp(l.length))}
      {printTl(tl)}
      <Parens shape=']' />
    </div>
  )
}

export default List;
