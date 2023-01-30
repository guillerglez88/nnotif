import { type Res, type Resp } from "fundation"

const created = <T extends Res>(res: T): Resp => ({
  status: 201,
  headers: {
    Location: res.url as string,
    ETag: `"${res.etag as string}"`,
  },
  body: res,
})

export { created }
