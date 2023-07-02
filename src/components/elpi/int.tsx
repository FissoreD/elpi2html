import { IntType } from '../types';


function Int({ num }: IntType) {
  return (
    <span className='var' style={{ color: 'blue' }}>
      {/* x<sub>{p.index}</sub> */}{num}
    </span>
  )
}

export default Int;
