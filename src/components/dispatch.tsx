import { AppType, ClauseType, CommaType, ConstType, DispatchApp, IntType, ListType, ParensMode, q, QuantificationType, StringType, SymbolsList, VarType } from './types';
import React from 'react';
import { displayList, Parenthesis, Symbol } from './tools';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setActive } from '../features/databaseSlice';

export function Clause({ hyp, args, isNeckcut }: ClauseType) {
  return (
    <div className='clause'>
      <div className='hyps'>{Array.isArray(hyp) && hyp.length === 0 ? <></> : Dispatch(hyp as DispatchApp)}</div>
      <div className={'compound concl' + (isNeckcut ? " neckcut" : "")}>
        {Dispatch(args)}
      </div>
    </div>
  )
}

export function Int({ num }: IntType) {
  return (<span className='num'>{num}</span>)
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

export function Var({ name, varId }: VarType) {
  const dispatch = useAppDispatch();
  
  let [name1, index] = name.split(" ");

  let activateVariable = () =>
    dispatch(setActive({ isActive: true, varId }))
  
  let deactivateVariable = () => 
    dispatch(setActive({ isActive: false, varId }))

  let isActive = useAppSelector(state => state.DB_State.variables[varId])

  return (<span className='var' onMouseEnter={activateVariable}
    onMouseLeave={deactivateVariable} style={isActive ? { background: "black", color: "white" } : {}}>{name1}<sub>{index}</sub></span>)
}

// for 9823 in json
// display λx1.λx2...λxn.Bo in the following way λx1 x2 ... xn.Bo
const accumulateSameSymbol = (type: q, body: any, names: any[]): any => {
  if (body.length === 1 && body[0].id === "quantification" && body[0].cnt.type === type) {
    names.push(...body[0].cnt.names)
    return accumulateSameSymbol(type, body[0].cnt.body, names)
  }
  return body
}

export function Quantification({ type, body, names }: QuantificationType) {
  let symbol: SymbolsList;
  switch (type) {
    case "binder": symbol = "λ"; break
    case "pi": symbol = "∀"; break
    case "sigma": symbol = "∃";
  }
  var names1 = [...names];
  var body1 = accumulateSameSymbol(type, body, names1);
  return (
    <span className='quantification'>
      <Parenthesis type={ParensMode.round}
        cnt={[<span className='symbolName'>
          <Symbol shape={symbol} />
          {displayList(0, false)(names1)}.
        </span>, displayList(-1)(body1)]}
        cond={true} />
    </span>
  )
}

export function Const({ name }: ConstType) {
  return <span className="const">{name}</span>
}

function interleave<T>(arr: T[], element: T): T[] {
  if (arr.length === 0) return [];
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    if (i < arr.length - 1) {
      result.push(element);
    }
  }
  return result;
}

let comma = { id: "const", cnt: ",", is_infix: true }
let pipe = { id: "const", cnt: "|", is_infix: true }
let op1 = { id: "const", cnt: "[", is_infix: true }
let op2 = { id: "const", cnt: "]", is_infix: true }

function bin_list(l: any[]) {
  if (l.length === 1) return l
  let l1 = [op1]
  let is_closed = l[l.length-1].cnt === "[]"
  for (let i = 0; i < l.length; i++){
    let x = l[i]
    if (typeof x.cnt !== "string") {
      l1.push(x)
      if (i === l.length - 2 && !is_closed) l1.push(pipe)
      else if (i !== l.length - 1) l1.push(comma)
    }
  }
  l1.push(op2)
  return l1
}

export function App({ cnt, is_infix }: AppType) {
  let cnt1: any[] = [];
  let is_comma = false;
  if (is_infix && cnt.length > 2) {
    let [hd, a1, ...tl] = cnt;
    if (hd.cnt === ",") {
      is_comma = true;
      cnt1 = interleave([a1].concat(tl), hd)
    } else if (hd.cnt === "::") {
      cnt1 = bin_list(cnt)
    }
    else cnt1 = [a1, hd].concat(tl)
  } else cnt1 = cnt;
  let [hd, ...tl] = cnt1;
  if (hd.id === "const" && (hd.cnt === "pi" || hd.cnt === "sigma")) {
    return Quantification({ ...tl[0].cnt, type: hd.cnt }) 
  }
  const putInParens = (e: any, key: number) => {
    return <Parenthesis key={key} type={ParensMode.round} cnt={[displayList(0, true)(e)]}
      // cond={Array.isArray(e) || ["app"].includes(e.id)}
      cond={!is_comma && ["app"].includes(e.id)}
    />
  }
  return (
    <span className={"app"}>
      {displayList(1, false)(hd)}
      {tl.map(putInParens)}
    </span>
  )
}



function Dispatch({ id, cnt, is_infix }: DispatchApp) {
  switch (id) {
    case "clause": return <Clause {...cnt} />
    // case "list": return <List {...cnt} />
    // case "num": return <Int num={cnt} />
    case "var": return <Var {...cnt} />
    case "const": return <Const name={cnt} />
    case "app": return <App cnt={cnt} is_infix={is_infix} />
    case "cut": return <Cut />
    case "discard": return <Discard />
    case "string": return <String name={cnt} />
    case "quantification": return <Quantification {...cnt as QuantificationType} />
    default: throw Error("No implementation for " + id)
  }
}

export default React.memo(Dispatch);
