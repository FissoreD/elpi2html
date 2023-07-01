export type DispatchProp = { id: string, cnt: any }

type VarName = string

export type VarType = { name: VarName }
export type IntType = { num: number }
export type ListType = { l: any[] }

export type QuantificationType = { type: "exists" | "forall" | "anonymousForall", names: VarName[], body: any }