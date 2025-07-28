import { DispatchApp, QuantificationType } from './types';
import AppInfix from './elpi/appInfix';
import { Clause, Comma, Const, Cut, Discard, List, App, Var, String, Quantification } from './elpi/constructs';
import React from 'react';


function Dispatch({ id, cnt }: DispatchApp) {
  switch (id) {
    case "clause": return <Clause {...cnt} />
    case "list": return <List {...cnt} />
    // case "num": return <Int num={cnt} />
    case "var": return <Var {...cnt} />
    case "const": return <Const name={cnt} />
    case "appInfix": return <AppInfix {...cnt} />
    case "app": return <App cnt={cnt} />
    case "comma": return <Comma cnt={cnt} />
    case "cut": return <Cut />
    case "discard": return <Discard />
    case "string": return <String name={cnt} />
    case "quantification": return <Quantification {...cnt as QuantificationType} />
    default: throw Error("No implementation for " + id)
  }
}

export default React.memo(Dispatch);
