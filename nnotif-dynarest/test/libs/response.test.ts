/**
 * @group unit
 */

import { row } from "../fixture"
import { normalize } from "../../src/libs/resource"
import * as sut from "../../src/libs/response"

describe("ExpressJS response utilities", () => {
  it("Can respond with created", () => {
    const res = normalize(row)

    const result = sut.created(res)

    expect(result).toEqual({
      status: 201,
      headers: new Map<string, string>([
        ["Location", "/Resource/1"],
        ["ETag", `"1034"`],
      ]),
      body: res,
    })
  })

  it("Can respond with ok", () => {
    const res = normalize(row)

    const result = sut.ok(res)

    expect(result).toEqual({
      status: 200,
      headers: new Map<string, string>([
        ["ETag", `"1034"`], //
      ]),
      body: res,
    })
  })
})
