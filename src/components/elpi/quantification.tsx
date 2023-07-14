import { displayHyp } from '../tools';
import { SymbolsList, QuantificationType } from '../types';
import { Symbol } from './misc';

export function Quantification({ body, names, type }: QuantificationType) {
  let symbol: SymbolsList;
  switch (type) {
    case "binder": symbol = "λ"; break;
    case "sigma": symbol = "∃"; break;
    case "pi": symbol = "∀";
  }
  return (
    <span>
      <Symbol shape={symbol} /> 
      {displayHyp(0)(names)}.
      {displayHyp(0)(body)}
    </span>
  )
}


