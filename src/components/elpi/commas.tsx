import { displayList } from '../tools';

interface CommaType { cnt: any[] }

function Comma({ cnt }: CommaType) {
  return <>{displayList(-1, true, true)(cnt)}</>
}

export default Comma;