import { ClauseType, ParensMode } from '../types';
import { displayList, Parenthesis } from '../tools';

function getPrio(i: string) {
  // note : same_term (3 = 3; (4=4, true)) (3=3;4=4,true)
  switch (i) {
    case "is": case ";": return -1;
    case "+": case "-": return 0
    case "*": case "/": return 1
    case "^": return 2
    case "=": case "<=": case ">=": case "<": case ">":
      return 3
    case "=>": return -1
    case ",": return -3
    default: return 100
  }
}

function getOperator(e: any): string {
  if (e.id === "propInfix") {
    let op = e.cnt.args[0].cnt
    return op
  }
  if (Array.isArray(e) && e[0].id === "comma")
    return ","
  return ""
}

function isMorePrio(op1: string, op2: string) {
  return getPrio(op1) > getPrio(op2)
}

function PropInfix({ args }: ClauseType) {
  let [infOp, left, right] = args;
  let putLeftParent = isMorePrio(infOp.cnt, getOperator(left))
  let putRightParent = isMorePrio(infOp.cnt, getOperator(right)) 
  return (
    <span className="prop">
      <Parenthesis type={ParensMode.round} cnt={[displayList(0)(left)]} cond={putLeftParent}/>
      <span className="infix">
        <b> {infOp.cnt} </b>
      </span>
      <Parenthesis type={ParensMode.round} cnt={[displayList(0)(right)]} cond={putRightParent} />
    </span>
  )
}

export default PropInfix;
