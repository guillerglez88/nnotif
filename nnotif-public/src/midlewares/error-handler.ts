// eslint-disable-next-line @typescript-eslint/no-misused-promises
import { type ErrorRequestHandler } from "express"
import { type ErrorHandlerError } from "aliases"
import debug from "debug"
import { type Outcome } from "validation"

debug("nnotif-public:error-handler")

const errorHandler: ErrorRequestHandler = (error: ErrorHandlerError, _, res, _next) => {
  const outcome: Outcome = {
    type: "Outcome",
    issues: [
      {
        level: "error",
        code: "/Coding/nnotif-public-subs-issue?code=exception",
        desc: `Error caught: ${error.message as string}`,
      },
    ],
  }

  debug(JSON.stringify(outcome))

  res.status(error.status ?? 500).json(outcome)
}

export { errorHandler }
