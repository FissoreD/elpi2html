export type id = "propInfix" | "prop" | "clause" | "list" | "var" |
  "const" | "card" | "discard" | "cut" | "quantification" |
  "comma" | "string"

export type DispatchProp = { id: id, cnt: any }

type VarName = string

export interface CardType { title: string, cnt: any }
export interface VarType { name: VarName }
export interface IntType { num: number }
export interface ListType { l: any[], tl?: any }

export interface ClauseType { hyp: any[], args: any[], isNeckcut : boolean }
export interface PropType { name: string }
export interface StringType { name: string }

export interface QuantificationType { type: "sigma" | "pi" | "binder", names: any[], body: any }

export enum ParensMode { round, square, curly }
export type SymbolsList = "[" | "]" | ")" | "{" | "}" | "(" | "|" | "λ" | "∃" | "∀" | ",";
export interface SymbolType { shape: SymbolsList }