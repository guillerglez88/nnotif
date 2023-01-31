/**
 * @group unit
 */
import { type Outcome } from "validation"

import { outcome } from "../fixture"
import * as sut from "../../src/libs/outcome"

describe("Validation outcome tests", () => {
  it("Can check if outcome is a success", () => {
    const success = sut.isSuccess({ prop: "foo" })
    const failure = sut.isSuccess(outcome)

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

  it("Can bind failure result", () => {
    const source: Outcome | { prop: string } = {
      type: "Outcome",
      issues: [{ level: "error", code: "foo" }],
    }

    const result = sut.bind(source, (_) => "bar")

    expect(result).toEqual(source)
  })

  it("Can bind success result", () => {
    const source: Outcome | { prop: string } = { prop: "foo" }
    const failure: Outcome | { prop: string } = {
      type: "Outcome",
      issues: [{ level: "error", code: "bar" }],
    }

    const result1 = sut.bind(source, (a) => a.prop)
    const result2 = sut.bind(source, (_) => failure)

    expect(result1).toBe("foo")
    expect(result2).toEqual(failure)
  })

  it("Can handle error as Outcome", async () => {
    const result = await sut.withHandled(() => {
      throw new Error("blah")
    })

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/outcome-issues?code=exception",
          desc: "Error caught: blah, {}",
        },
      ],
    })
  })
})
