import { AppType } from './types';
import Dispatch from '../dispatch';
import { DispatchProp } from '../types';
import React from 'react';

let printArgs = (len: number) => (e: DispatchProp, pos: number) =>
  <React.Fragment key={pos}><Dispatch {...e} key={pos} /> {len - 1 !== pos ? ',' : ''} </React.Fragment>


function Fun(p: AppType) {
  let separation = p.args.length > 0 ? ", " : "";
  return <span>(app [{p.name}{separation}{p.args.map(printArgs(p.args.length))}])</span>
}

export default Fun;
