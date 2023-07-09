import { displayHyp } from '../tools';

interface CommaType { cnt: any[] }

function Comma({ cnt }: CommaType) {
  return (
    <span className='comma'>
      {displayHyp(-1, true)(cnt)}
    </span>
  )
}

export default Comma;
