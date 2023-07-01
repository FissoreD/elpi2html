import Dispatch from '../dispatch';
import { QuantificationType } from '../types';
import Var from './var';


export function Quantification({ body, names, type }: QuantificationType) {
  let symbol: string;
  switch (type) {
    case "anonymousForall": symbol = "λ"; break;
    case "exists": symbol = "∃"; break;
    case "forall": symbol = "∀";
  }
  let cnt = <>{symbol} {names.map((name, pos) => <Var name={name} key={pos} />)}.{<Dispatch {...body} />}</>
  if (type === "anonymousForall") {
    return <span>({cnt})</span>
  }
  return <span>{cnt}</span>
}


