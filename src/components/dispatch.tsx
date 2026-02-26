import { AppType, ClauseType, CommaType, ConstType, DispatchApp, IntType, ListType, ParensMode, q, QuantificationType, StringType, SymbolsList, VarType } from './types';
import AppInfix from './elpi/appInfix';
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

export function Comma({ cnt }: CommaType) {
  return <>{displayList(-1, true, true)(cnt)}</>
}

export function Int({ num }: IntType) {
  return (<span className='num'>{num}</span>)
}

// export function List({ l, tl }: ListType) {
//   let printTl = (tl?: any) => {
//     if (tl) { return <> <Symbol shape="|" /> {displayList(-1)(tl)} </> }
//     return <></>
//   }
//   return <span className='list'>
//     <Parenthesis type={ParensMode.square} cnt={[displayList(-1, true)(l), printTl(tl)]} cond />
//   </span>
// }

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
  // } else if (type === "sigma" && body.cnt[0]?.cnt === "sigma") {
  //   let bpdy = body.cnt[1]
  //   names.push(...body[0].cnt.names)
  //   return accumulateSameSymbol(type, body[0].cnt.body, names)
  // } else if (type === "pi") {

  }
  // else {
    return body
  // }
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

export function App({ cnt, is_infix }: AppType) {
  let cnt1 : any[] = [];
  if (is_infix && cnt.length > 2) {
    let [hd, a1, ...tl] = cnt;
    if (hd.cnt == ",") {
      cnt1 = interleave([a1].concat(tl), hd)
    } else cnt1 = [a1, hd].concat(tl)
  } else cnt1 = cnt;
  let [hd, ...tl] = cnt1;
  if (hd.cnt === "pi" && hd.id === "const") return Quantification({ ...tl[0].cnt, type: "pi" })
  // if (hd.cnt === "sigma" && hd.id === "const") return Quantification({...tl[0].cnt, type: "sigma"})
  const putInParens = (e: any, key: number) => {
    return <Parenthesis key={key} type={ParensMode.round} cnt={[displayList(0, true)(e)]}
      cond={Array.isArray(e) || ["app"].includes(e.id)} />
  }
  return (
    <span className={"app"}>
      {displayList(0, false)(hd)}
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
    case "comma": return <Comma cnt={cnt} />
    case "cut": return <Cut />
    case "discard": return <Discard />
    case "string": return <String name={cnt} />
    case "quantification": return <Quantification {...cnt as QuantificationType} />
    default: throw Error("No implementation for " + id)
  }
}

export default React.memo(Dispatch);
