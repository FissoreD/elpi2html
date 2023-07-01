import React from 'react';
import Dispatch from '../dispatch';

function appInfix(p1: any) {
  return <><Dispatch {...p1.args[0]} /> {p1.name}  <Dispatch {...p1.args[1]} /></>
}

function appPrefix(p1: any) {
  return <>{p1.name} {p1.args.map((e: any, pos: number) => <Dispatch {...e} key={pos} />)}</>
}

function displayProp(p1: any) {
  if (p1.isInfix) return appInfix(p1);
  return appPrefix(p1)
}

function Prop(p: any) {
  // let p1 = p.p
  return (
    displayProp(p)
  )
}

export default Prop;
