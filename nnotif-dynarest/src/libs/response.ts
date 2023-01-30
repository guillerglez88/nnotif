import { type Res, type Resp } from "fundation"
import { type Response } from "aliases"

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

const withResp = <T extends Res>(result: T, map: (res: T) => Resp, res: Response): void => {
  const resp = map(result)
  const headers = resp.headers ?? new Map<string, string>()

  res.status(resp.status)

  for (const [key, val] of headers) {
    res.header(key, val)
  }

  res.json(resp.body)
}

export { ok, created, withResp }
