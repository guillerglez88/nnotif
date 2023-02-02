import { type Res, type Resp } from "fundation"
import { type Response } from "aliases"
import { type Outcome } from "validation"

import { fold, isNotFound } from "./outcome"

const ok = <T extends Res>(res: T): Resp => {
  const resp: Resp = {
    status: 200,
    headers: new Map<string, string>([]),
    body: res,
  }

  if (res.etag !== undefined) {
    resp.headers?.set("ETag", `"${res.etag}"`)
  }

  return resp
}

const created = <T extends Res>(res: T): Resp => {
  const resp: Resp = {
    status: 201,
    headers: new Map<string, string>([["Location", res.url as string]]),
    body: res,
  }

  if (res.etag !== undefined) {
    resp.headers?.set("ETag", `"${res.etag}"`)
  }

  return resp
}

const notFound = (outcome: Outcome): Resp => ({
  status: 404,
  body: outcome,
})

const deleted = (): Resp => ({
  status: 204,
})

const intServErr = (): Resp => ({
  status: 500,
})

const withResp = <T extends Res>(
  result: T | Outcome,
  map: (res: T) => Resp,
  res: Response,
): void => {
  const resp = fold(result, map, (err) => ({
    status: isNotFound(err) ? 404 : 500,
    body: err,
  }))

  const headers = resp.headers ?? new Map<string, string>()

  res.status(resp.status)

  for (const [key, val] of headers) {
    res.header(key, val)
  }

  res.json(resp.body)
}

export { ok, created, notFound, deleted, intServErr, withResp }
