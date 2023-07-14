import { IntType } from '../types';


function Int({ num }: IntType) {
  return (
    <span className='var' style={{ color: 'blue' }}>
      {num}
    </span>
  )
}

export default Int;
