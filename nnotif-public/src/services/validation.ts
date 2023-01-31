import { type NullableSubs } from "aliases"
import { type Outcome } from "validation"
import { type Response } from "node-fetch"
import { type Subs } from "data"

import { mapSuccess, withChecks } from "../libs/outcome"
import { isValidEmail } from "../libs/email"
import { isValidDob } from "../libs/dob"

const validateSubs = (subs?: NullableSubs): Subs | Outcome => {
  const check = withChecks((subs?: NullableSubs) => [
    {
      test: subs === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Body is empty",
        },
      ],
    },
    {
      test: subs !== undefined && subs.email === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop: `email: string` is required",
        },
      ],
    },
    {
      test: subs?.email !== undefined && !isValidEmail(subs.email),
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=value",
          desc: "Prop: `email` is not a valid email",
        },
      ],
    },
    {
      test: subs !== undefined && subs.dob === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop: `dob: string` is required",
        },
      ],
    },
    {
      test: subs?.dob !== undefined && !isValidDob(subs.dob),
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=value",
          desc: "Prop: `dob` is not valid acording to format: YYYY-MM-dd",
        },
      ],
    },
    {
      test: subs !== undefined && subs.consent === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop: `consent: boolean` is required",
        },
      ],
    },
    {
      test: subs?.consent !== undefined && !subs.consent,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=business-rule",
          desc: "Sorry, you must consent on data manipulation",
        },
      ],
    },
    {
      test: subs !== undefined && subs.newsLetterId === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop `newsLetterId` is required",
        },
      ],
    },
    {
      test: subs !== undefined && subs.name?.given === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop `name.given` is required",
        },
      ],
    },
    {
      test: subs !== undefined && subs.status === undefined,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Prop `status` is required, allowed values are: active | cancelled",
        },
      ],
    },
    {
      test: subs?.status !== undefined && !["active", "cancelled"].includes(subs.status),
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=required",
          desc: "Wrong `status`, allowed values are: active | cancelled",
        },
      ],
    },
  ])

  const valid = check(subs)

  return mapSuccess(valid, (subs) => subs as Subs)
}

const validateResp = async <T>(resp: Response): Promise<Outcome | T> => {
  const check = withChecks((d: { isSuccess: boolean; content: string }) => [
    {
      test: !d.isSuccess,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=exception",
          desc: `Error comunicating to dynarest\n\n${d.content}`,
        },
      ],
    },
  ])

  const isSuccess = resp.status >= 200 && resp.status < 300
  const content = await resp.text()
  const valid = check({ isSuccess, content })

  return mapSuccess(valid, ({ content }) => JSON.parse(content) as T)
}

export { validateSubs, validateResp }
