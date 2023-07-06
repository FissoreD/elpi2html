import React from "react";
import { ParensType, StringType } from "../types";

export function Cut() {
  return (<span className="cut">!</span>)
}

export function Discard() {
  return (<span className="discard">_</span>)
}

export function Parens({ shape }: ParensType) {
  return <span className="parens">{shape}</span>
}

export function String({name}: StringType) {
  return (
    <span className='string'>{name}</span>
  )
}