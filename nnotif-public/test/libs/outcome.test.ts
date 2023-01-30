/**
 * @group unit
 */
import { type Outcome } from "validation"

import { outcome } from "../fixture"
import * as sut from "../../src/libs/outcome"

describe("Validation outcome tests", () => {
  it("Can check if outcome is a success", () => {
    const success = sut.isValid(sut.EMPTY)
    const failure = sut.isValid(outcome)

    expect(success).toBeTruthy()
    expect(failure).toBeFalsy()
  })

  it("Can fold failure result", () => {
    const source: Outcome | { prop: string } = outcome

    const result = sut.fold(
      source,
      (_) => "success",
      (_) => "failure",
    )

    expect(result).toBe("failure")
  })

  it("Can fold success result", () => {
    const source: Outcome | { prop: string } = { prop: "blah" }

    const result = sut.fold(
      source,
      (_) => "success",
      (_) => "failure",
    )

    expect(result).toBe("success")
  })

  it("Can convert checks into outcome", () => {
    const result = sut.check([
      {
        test: true,
        issues: [
          {
            level: "error",
            code: "/Coding/nnotif-public-subs-issue?code=exception",
            desc: "foo",
          },
        ],
      },
      {
        test: false,
        issues: [
          {
            level: "error",
            code: "/Coding/nnotif-public-subs-issue?code=exception",
            desc: "bar",
          },
        ],
      },
    ])

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=exception",
          desc: "foo",
        },
      ],
    })
  })
})