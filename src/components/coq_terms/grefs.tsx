import { GrefType } from './types';

function Gref({ type, name }: GrefType) {
  return <span>({type} «{name}»)</span>
}

export default Gref;

