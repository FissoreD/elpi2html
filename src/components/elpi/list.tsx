import { ListType } from '../types';
import { Symbol } from './misc';
import { displayHyp } from '../tools';

let printTl = (tl?: any) => {
  if (tl) {
    return <> <Symbol shape="|" /> { displayHyp(-1)(tl) } </>
  }
  return <></>
}

function List({ l, tl }: ListType) {
  
  return (
    <div className='list'>
      <Symbol shape='[' />
        {/* TODO: HERE WE TO A MAP : Keep attention on commas... */}
        {displayHyp(0, true)(l)}
      {printTl(tl)}
      <Symbol shape=']' />
    </div>
  )
}

export default List;
