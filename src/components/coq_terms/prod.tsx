import React from 'react';
import { ProdType } from './types';
import Dispatch from '../dispatch';


function Prod(p: ProdType) {
  console.log("CIAOOOOO", p)
  return <span>(prod {p.name} {Dispatch(p.type)} {Dispatch(p.body)})</span>
}

export default Prod;
