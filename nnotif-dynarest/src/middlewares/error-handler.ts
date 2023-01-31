// eslint-disable-next-line @typescript-eslint/no-misused-promises
import { type ErrorRequestHandler } from "express"
import { type ErrorHandlerError } from "aliases"
import debug from "debug"

debug("nnotif-dynarest:error-handler")

const errorHandler: ErrorRequestHandler = (error: ErrorHandlerError, _, res, _next) => {
  const message =  `Error caught: ${error.message as string}`

  debug(message)

  res.status(error.status ?? 500).json(message)
}

export { errorHandler }
