import React from 'react';
import { DispatchProp, ListType } from '../types';
import Dispatch from '../dispatch';

let printHyp = (len: number) => (e: DispatchProp, pos: number) =>
  <React.Fragment key={pos}><Dispatch {...e} key={pos} /> {len - 1 !== pos ? ',' : ''} </React.Fragment>


function List({ l }: ListType) {
  return (
    <span>[{l.map(printHyp(l.length))}]</span>
  )
}

export default List;
