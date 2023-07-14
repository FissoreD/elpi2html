import { ClauseType } from '../types';
import { displayList } from '../tools';
import Dispatch from '../dispatch';
import { useState } from 'react';

function PropInfix({ args }: ClauseType) {
  let [infOp, left, right] = args;
  return (
    <span className="prop">
      {displayList(0)(left)}
      <span className="infix">
        <b> {infOp.cnt} </b>
      </span>
      {displayList(0)(right)}
    </span>
  )
}

export default PropInfix;
