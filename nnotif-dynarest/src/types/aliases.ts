import { type Request as ExpressRequest, type Response as ExpressResponse } from "express"
import { type Seq } from "fundation"

export type Request = ExpressRequest<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
>

export type Response = ExpressResponse

export type Sql = Array<string | unknown>

export type SeqConfig = Required<Pick<Seq, "start" | "inc" | "cache">>