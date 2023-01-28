export interface ResId {
  type: string
  id?: string
}

export interface Res extends ResId {}

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface Req {
  method: Method
  url: string
  body: Res
  status?: number
}

export interface Route extends Res {
  type: "Route"
  name: string
  code: string
  method?: Method
  path?: [
    {
      name: string
      code: string
      value?: string
    },
  ]
  routes?: string
  resource?: "/Resource/resource"
}

export interface Transaction extends Res {
  status: string
  mode: string
  items: Req[]
}
