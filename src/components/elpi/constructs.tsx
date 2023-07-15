import { displayList, displayParenthesis, putInFragment, Symbol } from "../tools";
import { ClauseType, CommaType, ConstType, IntType, ListType, ParensMode, PropType, StringType, VarType } from "../types";

export function Clause({ hyp, args, isNeckcut }: ClauseType) {
  return (
    <div className='clause'>
      <div className='hyps'>{displayList(-1)(hyp)}</div>
      <div className={'compound concl' + (isNeckcut ? " neckcut" : "")}>
        {displayList(-1)(args)}
      </div>
    </div>
  )
}

export function Comma({ cnt }: CommaType) {
  return <>{displayList(-1, true, true)(cnt)}</>
}

export function Int({ num }: IntType) {
  return (<span className='num'>{num}</span>)
}

export function List({ l, tl }: ListType) {
  let printTl = (tl?: any) => {
    if (tl) { return <> <Symbol shape="|" /> {displayList(-1)(tl)} </> }
    return <></>
  }
  return <span className='list'> {displayParenthesis(ParensMode.square, [displayList(-1, true)(l), printTl(tl)])} </span>
}

export function Cut() {
  return (<b className="cut">! </b>)
}

export function Discard() {
  return (<b className="discard">_ </b>)
}

export function String({ name }: StringType) {
  return <span className='string'>{name + " "}</span>
}

export function Var({ name }: VarType) {
  let [name1, index] = name.split(" ");
  return (<span className='var'>{name1}<sub>{index}</sub></span>)
}

export function Const({ name }: ConstType) {
  return <span className="const">{name}</span>
}

export function Prop({ cnt }: PropType) {
  let [hd, ...tl] = cnt;
  const putInParens = (e: any) => {
    return putInFragment(displayParenthesis(ParensMode.round, [displayList(0, true)(e)], Array.isArray(e) || ["prop", "propInfix"].includes(e.id)))
  }
  return (
    <span className={"prop"}>
      {displayList(0, false)(hd)}
      {tl.map(putInParens)}
    </span>
  )
}