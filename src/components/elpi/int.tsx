import React from 'react';
import { IntType } from '../types';


function Int({ num }: IntType) {
  return (
    <span className='var'>
      {/* x<sub>{p.index}</sub> */}
      {num}
    </span>
  )
}

export default Int;
