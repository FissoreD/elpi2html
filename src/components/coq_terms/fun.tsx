import { ProdType } from './types';
import Dispatch from '../dispatch';


function Fun(p: ProdType) {
  return <span>(fun {p.name} {Dispatch(p.type)}, {Dispatch(p.body)})</span>
}

export default Fun;
