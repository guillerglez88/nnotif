/**
 * @group unit
 */

import { type Subs } from "data"
import * as sut from "../../src/services/validation"

describe("Subscriptions validations", () => {
  it("Shouldnt be not null", () => {
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
      dob: "1988-04-18",
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

  it("Email shoult be valid", () => {
    const subs: Partial<Subs> = {
      name: {
        given: ["John"],
      },
      gender: "male",
      email: "bad-email.com",
      dob: "1988-04-18",
      consent: true,
      newsLetterId: "f03aad4e",
    }

    const result = sut.validateSubs(subs)

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=value",
          desc: "Prop: `email` is not a valid email",
        },
      ],
    })
  })

  it("Date of birth is required", () => {
    const subs: Partial<Subs> = {
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      gender: "male",
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
          desc: "Prop: `dob: string` is required",
        },
      ],
    })
  })

  it("Date of birth is correct", () => {
    const subs: Partial<Subs> = {
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      gender: "male",
      dob: "30-01-",
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
          desc: "Prop: `dob` is not valid acording to format: YYYY-MM-dd",
        },
      ],
    })
  })
})
