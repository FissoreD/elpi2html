import React from 'react';
import Dispatch from '../dispatch';
import { DispatchProp } from '../types';

let hasHypothesis = (p1: any): boolean => p1.hyp && p1.hyp.length > 0

let printHyp = (len: number) => (e: DispatchProp, pos: number) =>
  <React.Fragment key={pos}><Dispatch {...e} key={pos} /> {len - 1 !== pos ? ',' : ''} </React.Fragment>

function displayHyp(p1: any) {
  if (hasHypothesis(p1)) {
    let len = p1.hyp.length;
    return <div className='hyps'>{p1.hyp.map(printHyp(len))}</div>
  }
  return <></>
}

function appInfix(p1: any) {
  return <><Dispatch {...p1.args[0]} /> {p1.name}  <Dispatch {...p1.args[1]} /></>
}

function appPrefix(p1: any) {
  return <>{p1.name} {p1.args.map((e: any, pos: number) => <Dispatch {...e} key={pos} />)}</>
}

function displayConcl(p1: any) {
  if (p1.isInfix) return appInfix(p1);
  return appPrefix(p1)
}

function Clause(p: any) {
  let p1 = p.p;
  return (
    <div className='hyp clause'>
      {displayHyp(p1)}
      <div className={'compound ' + (hasHypothesis(p1) ? 'concl' : '')}>
        {displayConcl(p1)}
      </div>
    </div>
  )
}

export default Clause;
