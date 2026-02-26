export type id = "app" | "clause" | "list" | "var" |
  "const" | "card" | "discard" | "cut" | "quantification" |
  "comma" | "string" | "impl" | "rimpl" | "implBang"

export type DispatchApp = { id: id, cnt: any, is_infix: boolean }

type VarName = string

export interface CardType { predicate: string, title: string, cnt: any }
export interface VarType { name: VarName, varId: number }
export interface IntType { num: number }
export interface ListType { l: any[], tl?: any }
export interface CommaType { cnt: any[] }

export interface ClauseType { hyp: DispatchApp | [], args: DispatchApp, isNeckcut: boolean }
export interface AppType { cnt: any[], is_infix: boolean }
export interface StringType { name: string }
export interface ConstType { name: string }

export type q = "sigma" | "pi" | "binder"
export interface QuantificationType { type: q, names: any[], body: any }

export enum ParensMode { round, square, curly }
export type SymbolsList = "[" | "]" | ")" | "{" | "}" | "(" | "|" | "λ" | "∃" | "∀" | ",";
export interface SymbolType { shape: SymbolsList }