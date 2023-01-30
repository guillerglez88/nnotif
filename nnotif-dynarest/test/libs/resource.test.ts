/**
 * @group unit
 */

import { row } from "../fixture"
import * as sut from "../../src/libs/resource"

describe("REST resource utilities", () => {
  it("Can normalize resource", () => {
    const result = sut.normalize(row)

    expect(result).toEqual({
      id: "1",
      type: "Resource",
      created: new Date("2023-01-30T10:42:49.974Z"),
      modified: new Date("2023-01-30T10:42:49.974Z"),
      etag: "1034",
      url: "/Resource/1",
      desc: "REST resource",
      status: "/Coding/resource-statuses?code=pending",
      of: "Resource",
      routes: "/List?_of=Route&res-type=Resource",
    })
  })
})
