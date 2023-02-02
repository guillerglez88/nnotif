import { type Request, type Response } from "aliases"
import { type Res, type List, type Route } from "fundation"
import { type PoolClient } from "pg"

import { getPathTypeValue } from "../libs/routes"
import * as storage from "../data/storage"
import { config } from "../libs/config"
import { bind, mapSuccess } from "../libs/outcome"
import { ok, withResp } from "../libs/response"

const buildResultSet = <T>(
  type: string,
  offset: number,
  limit: number,
  total: number,
  items: T[],
): List<T> => {
  const url = `/List?_of=${type}&_limit=${limit}`
  const first = 0
  const last = Math.max(first, total - limit)
  const prev = Math.max(first, offset - limit)
  const next = Math.min(last, offset + limit)

  return {
    url,
    total,
    items,
    type: "List",
    nav: {
      fist: `${url}&_offset=${first}`,
      prev: `${url}&_offset=${prev}`,
      next: `${url}&_offset=${next}`,
      last: `${url}&_offset=${last}`,
    },
  }
}

const handler = async (
  req: Request,
  res: Response,
  route: Route,
  tx: PoolClient,
): Promise<void> => {
  const rtype = getPathTypeValue(route)
  const of = req.query._of as string | undefined
  const type = of ?? rtype

  const qoffset = req.query._offset as string | undefined
  const qlimit = req.query._limit as string | undefined
  const offset = Number.parseInt(qoffset ?? "0")
  const limit = Number.parseInt(qlimit ?? config.defaultLimit)

  const itemsResult = await storage.search(type, offset, limit, tx)
  const totalResult = await storage.total(type, offset, limit, tx)

  const result = bind(itemsResult, (r) => mapSuccess(totalResult, (t) => [r, t] as [Res[], number]))

  const list = mapSuccess(result, ([items, total]) => buildResultSet(type, offset, limit, total, items))

  withResp(list, ok, res)
}

export { handler }
