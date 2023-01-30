import { type Subs } from "data"
import { type Outcome } from "validation"
import { type Response } from "node-fetch"

import { check, mapValid } from "../libs/outcome"

const validateSubs = (subs?: Subs): Outcome => {
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
