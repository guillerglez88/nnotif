import { type InRow, type UpRow } from "aliases"
import { type Row } from "data"
import { type Route, type Resource } from "fundation"

const resource: Resource = {
  type: "Resource",
  id: "resource",
  desc: "REST resource",
  status: "/Coding/resource-statuses?code=pending",
  of: "Resource",
  routes: "/List?_of=Route&res-type=Resource",
}

const row: Row<Resource> = {
  resource,
  id: "1",
  type: "Resource",
  created: new Date("2023-01-30T10:42:49.974Z"),
  modified: new Date("2023-01-30T10:42:49.974Z"),
  etag: "1034",
}

const inRow: InRow<Resource> = {
  resource,
  id: "1",
  created: new Date("2023-01-30T10:42:49.974Z"),
  modified: new Date("2023-01-30T10:42:49.974Z"),
  type: "Resource",
}

const upRow: UpRow<Resource> = {
  resource,
  id: "1",
  modified: new Date("2023-01-30T10:42:49.974Z"),
  type: "Resource",
}

const notFoundRoute: Route = {
  type: "Route",
  name: "not-found",
  code: "/Coding/nerves?code=not-found",
  routes: "/List?_of=Route",
}

const createResRoute: Route = {
  type: "Route",
  method: "POST",
  path: [
    {
      name: "_type",
      code: "/Coding/wellknown-params?code=type",
      value: "Resource",
    },
  ],
  name: "create-resource",
  code: "/Coding/nerves?code=create",
  resource: "/Resource/resource",
}

const readResRoute: Route = {
  type: "Route",
  method: "GET",
  path: [
    {
      name: "_type",
      code: "/Coding/wellknown-params?code=type",
      value: "Resource",
    },
    {
      name: "_id",
      code: "/Coding/wellknown-params?code=id",
    },
  ],
  name: "read-resource",
  code: "/Coding/nerves?code=read",
  resource: "/Resource/resource",
}

const readResResolvedRoute: Route = {
  type: "Route",
  method: "GET",
  path: [
    {
      name: "_type",
      code: "/Coding/wellknown-params?code=type",
      value: "Resource",
    },
    {
      name: "_id",
      code: "/Coding/wellknown-params?code=id",
      value: "1",
    },
  ],
  name: "read-resource",
  code: "/Coding/nerves?code=read",
  resource: "/Resource/resource",
}

export {
  resource,
  row,
  inRow,
  upRow,
  createResRoute,
  readResRoute,
  readResResolvedRoute,
  notFoundRoute,
}
