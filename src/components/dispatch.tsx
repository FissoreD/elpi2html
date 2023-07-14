import Clause from './elpi/clause';
import List from './elpi/list';
import Var from './elpi/var';
import { DispatchProp, QuantificationType } from './types';
import { Quantification } from './elpi/quantification';
import Int from './elpi/int';
import Const from './elpi/const';
import { Cut, Discard , String } from './elpi/misc';
import Prop from './elpi/prop';
import Comma from './elpi/commas';
import PropInfix from './elpi/propInfix';


function Dispatch({ id, cnt }: DispatchProp) {
  switch (id) {
    case "clause": return <Clause {...cnt} />
    case "list": return <List {...cnt} />
    case "num": return <Int num={cnt} />
    case "var": return <Var name={cnt} />
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

export default Dispatch;
