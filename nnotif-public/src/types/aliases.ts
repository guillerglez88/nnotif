import { type Request } from "express"
import { type HumanName, type Subs } from "data"

export type ReadSubsReq = Request<
  { id: string },
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
>

export type CreateSubsReq = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Subs,
  Record<string, unknown>
>

export type UpdateSubsReq = Request<
  { id: string },
  Record<string, unknown>,
  Subs,
  Record<string, unknown>
>

export interface ErrorHandlerError {
  status?: number
  message?: string
}

export type NullableSubs = Partial<Omit<Subs, "name"> & { name: Partial<HumanName> }>
