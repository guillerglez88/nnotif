import { type Row } from "data"
import { type Request as ExpressRequest, type Response as ExpressResponse } from "express"
import { type Res, type Seq } from "fundation"

export type Request = ExpressRequest<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
>

export type Response = ExpressResponse

export type Sql = Array<string | unknown>

export type InRow<T extends Res> = Omit<Row<T>, "etag">

export type UpRow<T extends Res> = Pick<Row<T>, "resource" | "modified" | "id" | "type">

export type SeqConfig = Required<Pick<Seq, "start" | "inc" | "cache">>

export interface ErrorHandlerError {
  status?: number
  message?: string
}