export type DispatchProp = { id: string, cnt: any }

type VarName = string

export interface VarType { name: VarName }
export interface IntType { num: number }
export interface ListType { l: any[], tl?: any }

export interface QuantificationType { type: "exists" | "forall" | "anonymousForall", names: VarName[], body: any }