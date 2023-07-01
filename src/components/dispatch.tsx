import React from 'react';
import Clause from './elpi/clause';
import List from './elpi/list';
import App from './coq_terms/app';
import Prod from './coq_terms/prod';
import Var from './elpi/var';
import Fun from './coq_terms/fun';
// import { DispatchProp } from './types';
export interface DispatchProp { id: string, cnt: any }

function Dispatch(p1: any) {
  let p = p1.p;
  switch (p.id) {
    case "clause": return <Clause p={p.cnt} />
    case "list": return <List p={p.cnt} />
    case "app": return <App p={p.cnt} />
    case "prod": return <Prod p={p.cnt} />
    case "fun": return <Fun p={p.cnt} />
    case "var": return <Var p={p.cnt} />
    case undefined: throw Error("Id not found in" + JSON.stringify(p))
    default: throw Error("No implementation for" + p.id)
  }
}

export default Dispatch;
