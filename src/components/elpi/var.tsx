import React from 'react';


function Var(p: any) {
  return (
    <span className={'name ' + (p.isOver ? "hover" : "")} onMouseOver={() => p.f(true)} onMouseLeave={() => p.f(false)}>
      x<sub>{p.index}</sub>
    </span>
  )
}

export default Var;
