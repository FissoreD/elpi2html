import React from 'react';
import { DispatchProp, ListType } from '../types';
import Dispatch from '../dispatch';

let printHyp = (len: number) => (e: DispatchProp, pos: number) =>
  <React.Fragment key={pos}><Dispatch {...e} key={pos} /> {len - 1 !== pos ? ',' : ''} </React.Fragment>

let printTl = (tl?: any) => {
  if (tl) {
    return <>|<Dispatch {...tl} /></>
  }
  return <></>
}

function List({ l, tl }: ListType) {
  return (
    <span>[{l.map(printHyp(l.length))}{printTl(tl)}]</span>
  )
}

export default List;
