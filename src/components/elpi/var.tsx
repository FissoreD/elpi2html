import React from 'react';
import { VarType } from '../types';


function Var(p: VarType) {
  let name = p.name;
  return (
    <span className='var'>
      {/* x<sub>{p.index}</sub> */}
      {name}
    </span>
  )
}

export default Var;
