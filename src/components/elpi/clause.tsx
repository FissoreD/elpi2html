import { ClauseType } from '../types';
import { displayHyp } from '../tools';

const displayHyps = (hyp: any[]) => { 
  if (hyp.length === 0) return <></>
  else return (
    <div className='hyps'>
      {displayHyp(0)(hyp, 0)}
    </div>
  )
}

function Clause({ hyp, args }: ClauseType) {
  return (
    <div className='clause'>
      {displayHyps(hyp)}
      <div className={'compound concl'}>
        {displayHyps(args)}
      </div>
    </div>
  )
}

export default Clause;
