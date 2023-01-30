import { type Request } from "express"
import { type Subs } from "data"

export type CreateSubsReq = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Subs,
  Record<string, unknown>
>
