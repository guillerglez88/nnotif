import { type Res, type Resp } from "fundation"

const ok = <T extends Res>(res: T): Resp => ({
  status: 200,
  headers: {
    ETag: `"${res.etag as string}"`,
  },
  body: res,
})

const created = <T extends Res>(res: T): Resp => ({
  status: 201,
  headers: {
    Location: res.url as string,
    ETag: `"${res.etag as string}"`,
  },
  body: res,
})

export { ok, created }
