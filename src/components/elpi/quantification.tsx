import { displayHyp } from '../tools';
import { QuantificationType } from '../types';

export function Quantification({ body, names, type }: QuantificationType) {
  let symbol: string;
  switch (type) {
    case "anonymousForall": symbol = "λ"; break;
    case "exists": symbol = "∃"; break;
    case "forall": symbol = "∀";
  }
  return (
    <>
      {symbol}
      {displayHyp(0)(names, 0)}.
      {displayHyp(0)(body, 0)}
    </>
  )
}


