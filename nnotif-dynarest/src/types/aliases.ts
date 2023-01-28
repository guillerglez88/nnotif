import { type Request as ExpressRequest, type Response as ExpressResponse } from "express"

export type Request = ExpressRequest<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
>

export type Response = ExpressResponse
