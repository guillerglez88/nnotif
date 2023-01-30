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

  it("Email is required", () => {
    const subs: Partial<Subs> = {
      name: {
        given: ["John"],
      },
      gender: "male",
      dob: new Date("2023-01-30T17:54:38.345Z"),
      consent: true,
      newsLetterId: "f03aad4e",
    }

    const result = sut.validateSubs(subs)

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop: `email: string` is required",
        },
      ],
    })
  })
})
