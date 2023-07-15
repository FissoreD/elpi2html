import { displayList, displayParenthesis, Symbol } from '../tools';
import { SymbolsList, QuantificationType, ParensMode } from '../types';

// for 9823 in json
// display λx1.λx2...λxn.Bo in the following way λx1 x2 ... xn.Bo
const accumulateSameSymbol = (type: string, body: any, names: any[]): any => {
  if (body.length === 1 && body[0].id === "quantification" && body[0].cnt.type === type) {
    names.push(...body[0].cnt.names)
    return accumulateSameSymbol(type, body[0].cnt.body, names)
  } else {
    return body
  }
}

export function Quantification({ body, names, type }: QuantificationType) {
  let symbol: SymbolsList;
  switch (type) {
    case "binder": symbol = "λ"; break;
    case "sigma": symbol = "∃"; break;
    case "pi": symbol = "∀";
  }
  var names1 = [...names];
  var body1 = accumulateSameSymbol(type, body, names1);
  return (
    <span className='quantification'>
      {displayParenthesis(ParensMode.round,
        [<span className='symbolName'>
          <Symbol shape={symbol} />
          {displayList(0, false)(names1)}.
        </span>, displayList(-1)(body1)],
        type === "binder")}
    </span>
  )
}


