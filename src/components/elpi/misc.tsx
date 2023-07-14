import React from "react";
import { SymbolType, StringType } from "../types";
import IntGenerator from "../../generator";

export function Cut() {
  return (<b className="cut">! </b>)
}

export function Discard() {
  return (<b className="discard">_ </b>)
}

export function Symbol({ shape }: SymbolType) {
  return <span className="symbol">{shape} </span>
}

export function String({name}: StringType) {
  return <span className='string'>{name + " "}</span>
}

export const putInFragment = (e: React.ReactNode) => 
  <React.Fragment key={IntGenerator.next().value!}>{e}</React.Fragment>