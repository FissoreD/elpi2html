import React from 'react';
import Clause from './elpi/clause';
import List from './elpi/list';
import Var from './elpi/var';
import { DispatchProp, QuantificationType } from './types';
import { AppType, GlobalType, GrefType, ProdType } from './coq_terms/types';
import { Quantification } from './elpi/quantification';
import Int from './elpi/int';
import Prop from './elpi/prop';
import { Gref, Global, App, Prod, Fun } from './coq_terms/term';


function Dispatch({ id, cnt }: DispatchProp) {
  switch (id) {
    case "clause": return <Clause p={cnt} />
    case "list": console.log({ id, cnt }); return <List {...cnt} />
    case "num": return <Int num={cnt} />
    case "var": return <Var name={cnt} />
    case "prop": return <Prop {...cnt} />
    case "quantification": return <Quantification {...cnt as QuantificationType} />

    // COQ
    case "gref": return <Gref {...cnt as GrefType} />
    case "global": return <Global {...cnt as GlobalType} />
    case "app": return <App {...cnt as AppType} />
    case "prod": return <Prod {...cnt as ProdType} />
    case "fun": return <Fun {...cnt as ProdType} />

    default: throw Error("No implementation for " + id)
  }
}

export default Dispatch;
