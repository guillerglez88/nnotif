/**
 * @group unit
 */

import { type Subs } from "data"
import * as sut from "../../src/services/validation"

describe("Subscriptions validations", () => {
  it("Should be not null", () => {
    const subs: Subs | undefined = undefined

    const result = sut.validateSubs(subs)

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Body is empty",
        },
      ],
    })
  })
})
