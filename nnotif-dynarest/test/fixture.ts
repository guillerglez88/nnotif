import { type InRow, type UpRow } from "aliases"
import { type Row } from "data"
import { type Resource } from "fundation"

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

export { resource, row, inRow, upRow }
