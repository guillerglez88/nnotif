/**
 * @group unit
 */

import { type Outcome } from "validation"
import * as sut from "../../src/libs/outcome"

describe("Validation outcome tests", () => {
  it("Can check if outcome is a success", () => {
    const outcome: Outcome = {
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=exception",
          desc: "blah blah",
        },
      ],
    }

    const success = sut.isValid(sut.EMPTY)
    const failure = sut.isValid(outcome)

    expect(success).toBeTruthy()
    expect(failure).toBeFalsy()
  })
})
