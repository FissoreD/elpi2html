import { useState } from 'react';
import { displayList, displayParenthesis } from '../tools';
import { putInFragment, Symbol } from './misc';
import { ParensMode } from '../types';

interface PropType { cnt: any[] }

const putInParens = (e: any) => {
  if (Array.isArray(e) || ["prop", "propInfix"].includes(e.id)) {
    return putInFragment(displayParenthesis(ParensMode.round, [displayList(0, true)(e)]))
  } else {
    return putInFragment(displayList(0, true)(e))
  }
}

function Prop({ cnt }: PropType) {
  let [hd, ...tl] = cnt;
  return (
    <span className={"prop"}>
      {displayList(0, false)(hd)}
      {tl.map(putInParens)}
    </span>
  )
}

export default Prop;
