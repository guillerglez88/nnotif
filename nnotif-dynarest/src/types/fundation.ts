export interface ResId {
  type: string
  id: string
}

export interface Res extends ResId {}

export type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"

export interface Req {
  method: Method
  url: string
  body: Res
  status: number
}

export interface Transaction extends Res {
  status: string
  mode: string
  items: [Req]
}
