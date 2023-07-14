export type DispatchProp = { id: string, cnt: any }

type VarName = string

export interface VarType { name: VarName }
export interface IntType { num: number }
export interface ListType { l: any[], tl?: any }

export interface ClauseType { hyp: any[], args: any[] }
export interface PropType { name: string }
export interface StringType { name: string }

export interface QuantificationType { type: "sigma" | "pi" | "binder", names: any[], body: any }

export enum ParensMode { round, square, curly }
export type SymbolsList = "[" | "]" | ")" | "{" | "}" | "(" | "|" | "λ" | "∃" | "∀" | ",";
export interface SymbolType { shape: SymbolsList }