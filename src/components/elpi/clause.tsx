import React from 'react';
import Dispatch from '../dispatch';
import { DispatchProp } from '../types';

let hasHypothesis = (p1: any): boolean => p1.hyp && p1.hyp.length > 0

let printHyp = (len: number) => (e: DispatchProp, pos: number) =>
  <React.Fragment key={pos}><Dispatch p={e} key={pos} /> {len - 1 !== pos ? ',' : ''} </React.Fragment>

function displayHyp(p1: any) {
  if (hasHypothesis(p1)) {
    let len = p1.hyp.length;
    return <div className='hyps'>{p1.hyp.map(printHyp(len))}</div>
  }
  return <></>
}

function Clause(p: any) {
  let p1 = p.p;
  console.log(p1)
  return (
    <div className='hyp clause'>
      {displayHyp(p1)}
      <div className={'compound ' + (hasHypothesis(p1) ? 'concl' : '')}>
        {p1.name} {p1.args.map((e: any, pos: number) => <span key={pos}> {e.cnt} </span>)}
      </div>
    </div>
  )
}

export default Clause;
