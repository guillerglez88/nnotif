import { type Subs } from "data"
import { type Outcome } from "validation"
import { type Response } from "node-fetch"

import { check, mapValid } from "../libs/outcome"
import { isValidEmail } from "../libs/email"

const validateSubs = (subs?: Partial<Subs>): Outcome => {
  const outcome: Outcome = check([
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
  ])

  return outcome
}

const validateResp = async <T>(resp: Response): Promise<Outcome | T> => {
  const isSuccess = resp.status >= 200 && resp.status < 300
  const content = await resp.text()

  const outcome = check([
    {
      test: !isSuccess,
      issues: [
        {
          level: "error",
          code: "/Coding/nnotif-public-subs-issue?code=exception",
          desc: `Error comunicating to dynarest\n\n${content}`,
        },
      ],
    },
  ])

  return mapValid(outcome, () => JSON.parse(content) as T)
}

export { validateSubs, validateResp }
