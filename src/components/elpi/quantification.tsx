import { displayHyp } from '../tools';
import { SymbolsList, QuantificationType } from '../types';
import { Symbol } from './misc';

export function Quantification({ body, names, type }: QuantificationType) {
  let symbol: SymbolsList;
  switch (type) {
    case "anonymousForall": symbol = "λ"; break;
    case "sigma": symbol = "∃"; break;
    case "pi": symbol = "∀";
  }
  return (
    <>
      <Symbol shape={symbol}  /> 
      {displayHyp(0)(names)}.
      {displayHyp(0)(body)}
    </>
  )
}


