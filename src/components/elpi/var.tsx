import { VarType } from '../types';


function Var({ name }: VarType) {
  let [name1, index] = name.split(" ");
  return (
    <span className='var'>
      {name1}<sub>{index}</sub>
    </span>
  )
}

export default Var;
