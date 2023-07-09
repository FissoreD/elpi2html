import { ClauseType } from '../types';
import { displayHyp } from '../tools';

const displayHyps = (hyp: any[]) => { 
  if (hyp.length === 0) return <></>
  else return (
    <div className='hyps'>
      {displayHyp(-1)(hyp)}
    </div>
  )
}

function Clause({ hyp, args }: ClauseType) {
  return (
    <div className='clause'>
      {displayHyps(hyp)}
      <div className={'compound concl'}>
        {displayHyp(-1)(args)}
      </div>
    </div>
  )
}

export default Clause;
