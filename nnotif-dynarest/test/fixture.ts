import { type InRow } from "aliases"
import { type Resource } from "fundation"

const resource: Resource = {
  type: "Resource",
  id: "resource",
  desc: "REST resource",
  status: "/Coding/resource-statuses?code=pending",
  of: "Resource",
  routes: "/List?_of=Route&res-type=Resource",
}

const inRow: InRow<Resource> = {
  resource,
  id: "1",
  created: new Date("2023-01-30T10:42:49.974Z"),
  modified: new Date("2023-01-30T10:42:49.974Z"),
  type: "Resource",
}

export { resource, inRow }
