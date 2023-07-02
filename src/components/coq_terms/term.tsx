import React from 'react';
import { AppType, GlobalType, GrefType, ProdType } from './types';
import Dispatch from '../dispatch';
import { DispatchProp } from '../types';

export function Gref({ type, name }: GrefType) {
  return <span>({type} «{name}»)</span>
}

export function Global(p: GlobalType) {
  return <span>(global ({p.type}) «{p.name}»)</span>
}

export function Prod(p: ProdType) {
  return <span>(prod {p.name} {Dispatch(p.type)} {Dispatch(p.body)})</span>
}

export function Fun(p: ProdType) {
  return <span>(fun {p.name} {Dispatch(p.type)}, {Dispatch(p.body)})</span>
}

let printArgs = (len: number) => (e: DispatchProp, pos: number) =>
  <React.Fragment key={pos}><Dispatch {...e} key={pos} /> {len - 1 !== pos ? ',' : ''} </React.Fragment>


export function App(p: AppType) {
  let separation = p.args.length > 0 ? ", " : "";
  return <span>(app [{p.name}{separation}{p.args.map(printArgs(p.args.length))}])</span>
}