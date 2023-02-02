export interface Ref {
  type: string
  id?: string
}

export interface Res extends Ref {
  url?: string
  created?: Date
  modified?: Date
  etag?: string
}

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface Req {
  method: Method
  url: string
  body: Res
  status?: number
}

export interface Resp {
  status: number,
  body?: Res,
  headers?: Map<string, string>
}

export interface Route extends Res {
  type: "Route"
  name: string
  code: string
  method?: Method
  path?: RoutePathComp[]
  routes?: string
  resource?: "/Resource/resource"
}

export interface RoutePathComp {
  name: string
  code: string
  value?: string
}

export interface Transaction extends Res {
  type: "Transaction"
  status: string
  mode: string
  items: Req[]
}

export interface Resource extends Res {
  type: "Resource"
  desc?: string
  status: string
  of: string
  routes?: string
}

export interface Seq extends Res {
  type: "Seq"
  desc?: string
  start?: number
  inc?: number
  cache?: number
}

export interface List<T> extends Res {
  type: "List",
  items: T[],
  total: number,
  nav?: ListNav
}

export interface ListNav {
  fist?: string
  prev?: string
  next?: string
  last?: string
}