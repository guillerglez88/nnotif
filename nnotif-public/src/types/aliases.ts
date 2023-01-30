import { type Request } from "express"
import { type HumanName, type Subs } from "data"

export type CreateSubsReq = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Subs,
  Record<string, unknown>
>

export type NullableSubs = Partial<Omit<Subs, "name"> & { name: Partial<HumanName> }>
