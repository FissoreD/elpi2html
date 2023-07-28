import { DispatchProp, QuantificationType } from './types';
import { Quantification } from './elpi/quantification';
import PropInfix from './elpi/propInfix';
import { Clause, Comma, Const, Cut, Discard, List, Prop, Var, String } from './elpi/constructs';
import React from 'react';


function Dispatch({ id, cnt }: DispatchProp) {
  console.log("A")
  switch (id) {
    case "clause": return <Clause {...cnt} />
    case "list": return <List {...cnt} />
    // case "num": return <Int num={cnt} />
    case "var": return <Var {...cnt} />
    case "const": return <Const name={cnt} />
    case "propInfix": return <PropInfix {...cnt} />
    case "prop": return <Prop cnt={cnt} />
    case "comma": return <Comma cnt={cnt} />
    case "cut": return <Cut />
    case "discard": return <Discard />
    case "string": return <String name={cnt} />
    case "quantification": return <Quantification {...cnt as QuantificationType} />
    default: throw Error("No implementation for " + id)
  }
}

export default React.memo(Dispatch);
