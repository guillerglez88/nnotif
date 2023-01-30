/**
 * @group unit
 */

import { type NullableSubs } from "aliases"
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
    const subs: NullableSubs = {
      status: "active",
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
    const subs: NullableSubs = {
      status: "active",
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
    const subs: NullableSubs = {
      status: "active",
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

  it("Date of birth format is correct", () => {
    const subs: NullableSubs = {
      status: "active",
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
          code: "/Coding/nnotif-public-subs-issue?code=value",
          desc: "Prop: `dob` is not valid acording to format: YYYY-MM-dd",
        },
      ],
    })
  })

  it("Consent is required", () => {
    const subs: NullableSubs = {
      status: "active",
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      dob: "1988-04-18",
      gender: "male",
      newsLetterId: "f03aad4e",
    }

    const result = sut.validateSubs(subs)

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop: `consent: boolean` is required",
        },
      ],
    })
  })

  it("Consent should be true", () => {
    const subs: NullableSubs = {
      status: "active",
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      dob: "1988-04-18",
      gender: "male",
      newsLetterId: "f03aad4e",
      consent: false,
    }

    const result = sut.validateSubs(subs)

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=business-rule",
          desc: "Sorry, you must consent on data manipulation",
        },
      ],
    })
  })

  it("NewsleterId is required", () => {
    const subs: NullableSubs = {
      status: "active",
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      dob: "1988-04-18",
      gender: "male",
      consent: true,
    }

    const result = sut.validateSubs(subs)

    expect(result).toEqual({
      type: "Outcome",
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop `newsLetterId` is required",
        },
      ],
    })
  })

  it("Given name is required", () => {
    const subs: NullableSubs = {
      status: "active",
      name: {
        family: ["Doe"],
      },
      email: "nnotif-no-reply@mailinator.com",
      dob: "1988-04-18",
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
          desc: "Prop `name.given` is required",
        },
      ],
    })
  })

  it("Status is required", () => {
    const subs: NullableSubs = {
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      dob: "1988-04-18",
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
          desc: "Prop `status` is required, allowed values are: active | cancelled",
        },
      ],
    })
  })

  it("Status value is allowed", () => {
    const subs: NullableSubs = {
      status: "fake",
      name: {
        given: ["John"],
      },
      email: "nnotif-no-reply@mailinator.com",
      dob: "1988-04-18",
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
          desc: "Wrong `status`, allowed values are: active | cancelled",
        },
      ],
    })
  })
})
