export type Terms = "App" | "Fun" | "Prod" | "Var"

// Terms
export type GlobalType = { name: string, type: string }
export type ProdType = { name: string, type: any, body: any }
export type AppType = { name: string, args: any[] }

// Gref
export type GrefStr = "indt" | "indc" | "const"
export type GrefType = { type: GrefStr, name: string }