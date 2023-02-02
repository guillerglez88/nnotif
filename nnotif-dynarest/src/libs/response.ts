import { type Res, type Resp } from "fundation"
import { type Response } from "aliases"
import { type Outcome } from "validation"

import { fold } from "./outcome"

const ok = <T extends Res>(res: T): Resp => ({
  status: 200,
  headers: new Map<string, string>([
    ["ETag", `"${res.etag as string}"`], //
  ]),
  body: res,
})

const created = <T extends Res>(res: T): Resp => ({
  status: 201,
  headers: new Map<string, string>([
    ["Location", res.url as string], //
    ["ETag", `"${res.etag as string}"`],
  ]),
  body: res,
})

const notFound = (outcome: Outcome): Resp => ({
  status: 404,
  body: outcome,
})

const deleted = (): Resp => ({
  status: 204,
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

const isNotFound = (err: Outcome): boolean => {
  return (err.issues ?? []).some(({ code }) => code === "/Coding/outcome-issues?code=not-found")
}

export { ok, created, notFound, deleted, withResp }
