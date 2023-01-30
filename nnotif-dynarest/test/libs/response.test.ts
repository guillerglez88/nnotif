/**
 * @group unit
 */

import { row } from "../fixture"
import { normalize } from "../../src/libs/resource"
import * as sut from "../../src/libs/response"

describe("ExpressJS response utilities", () => {
  it("Can response with created", () => {
    const res = normalize(row)

    const result = sut.created(res)

    expect(result).toEqual({
      status: 201,
      headers: {
        Location: "/Resource/1",
        ETag: `"1034"`,
      },
      body: res,
    })
  })
})
