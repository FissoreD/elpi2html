import React from "react";
import { SymbolType, StringType } from "../types";
import IntGenerator from "../../generator";

export function Cut() {
  return (<span className="cut">!</span>)
}

export function Discard() {
  return (<span className="discard">_</span>)
}

export function Symbol({ shape }: SymbolType) {
  return <span className={"symbol" + (["]", ")", "}"].includes(shape) ? " flex-end" : "")}>{shape}</span>
}

export function String({name}: StringType) {
  return (
    <span className='string'>{name}</span>
  )
}

export const putInFragment = (e: React.ReactNode) => 
  <React.Fragment key={IntGenerator.next().value!}>{e}</React.Fragment>