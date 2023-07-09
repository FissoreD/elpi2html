import Clause from './elpi/clause';
import List from './elpi/list';
import Var from './elpi/var';
import { DispatchProp, QuantificationType } from './types';
import { AppType, GlobalType, GrefType, ProdType } from './coq_terms/types';
import { Quantification } from './elpi/quantification';
import Int from './elpi/int';
import Const from './elpi/const';
import { Gref, Global, App, Prod, Fun } from './coq_terms/term';
import PropInfix from './elpi/propInfix';
import { Cut, Discard , String } from './elpi/misc';


function Dispatch({ id, cnt }: DispatchProp) {
  switch (id) {
    case "clause": return <Clause {...cnt} />
    case "list": return <List {...cnt} />
    case "num": return <Int num={cnt} />
    case "var": return <Var name={cnt} />
    case "const": return <Const name={cnt} />
    case "propInfix": return <PropInfix {...cnt} />
    case "cut": return <Cut />
    case "discard": return <Discard />
    case "string": return <String name={cnt} />
    case "quantification": return <Quantification {...cnt as QuantificationType} />

    // COQ
    case "gref": return <Gref {...cnt as GrefType} />
    case "global": return <Global {...cnt as GlobalType} />
    case "app": return <App {...cnt as AppType} />
    case "prod": return <Prod {...cnt as ProdType} />
    case "fun": return <Fun {...cnt as ProdType} />

    // default: return <></>
    default: throw Error("No implementation for " + id)
  }
}

export default Dispatch;
