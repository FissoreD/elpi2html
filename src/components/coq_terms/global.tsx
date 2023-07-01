import { GlobalType } from './types';


function Global(p: GlobalType) {
  return <span>(global ({p.type}) «{p.name}»)</span>
}

export default Global;
